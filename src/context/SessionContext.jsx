import { createContext, useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabase";

export const SessionContext = createContext({
  session: null,
  profile: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const isSigningUpRef = useRef(false);

  // -------------------------------------------------------------------
  // FETCH PROFILE
  // -------------------------------------------------------------------
  async function fetchUserProfile(userId) {
  if (!userId) {
    setProfile(null);
    return;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;

    setProfile(data || null);
  } catch (err) {
    console.error("fetchUserProfile error:", err);
    setProfile(null);
  }
}


  // -------------------------------------------------------------------
  // INIT SESSION + ON AUTH STATE CHANGE
  // -------------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(currentSession);
        if (currentSession?.user?.id) {
          await fetchUserProfile(currentSession.user.id);
        }
      }
    }

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      // Se estivermos no fluxo de sign-up, ignoramos mudanças temporárias de sessão
      if (isSigningUpRef.current) return;

      setSession(newSession);
      fetchUserProfile(newSession?.user?.id);
    });

    const sub = data?.subscription;

    return () => {
      mounted = false;
      sub?.unsubscribe?.();
    };
  }, []);

  // -------------------------------------------------------------------
  // SIGN UP (SEM LOGIN AUTOMÁTICO + CRIA PROFILE)
  // -------------------------------------------------------------------
  async function handleSignUp(email, password, username, onSuccess) {
  setSessionLoading(true);
  setSessionError(null);
  isSigningUpRef.current = true;

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    });

    if (signUpError) throw signUpError;

    const user = signUpData.user;
    if (!user) throw new Error("Nenhum usuário retornado.");

    // Registrar o profile
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      email,
      username,
      admin: false,
      created_at: new Date(),
    });
    if (profileError) throw profileError;

    // 🔥 NÃO FAZ LOGIN AUTOMÁTICO!
    await supabase.auth.signOut();

    // Chama toast do Login.jsx
    if (onSuccess) onSuccess();

    // sinaliza que fluxo de registro terminou (permite onAuthStateChange novamente)
    isSigningUpRef.current = false;
  } catch (err) {
    console.error(err);
    setSessionError(err.message || String(err));
  } finally {
    setSessionLoading(false);
  }
}

  // -------------------------------------------------------------------
  // SIGN IN
  // -------------------------------------------------------------------
  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        await fetchUserProfile(data.session.user.id);
        setSessionMessage("Login realizado com sucesso!");
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setSessionError(err.message || String(err));
    } finally {
      setSessionLoading(false);
    }
  }

  // -------------------------------------------------------------------
  // SIGN OUT
  // -------------------------------------------------------------------
  async function handleSignOut() {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setProfile(null);
      window.location.href = "/";
    } catch (err) {
      setSessionError(err.message || String(err));
    } finally {
      setSessionLoading(false);
    }
  }

  // -------------------------------------------------------------------
  // PROVIDER
  // -------------------------------------------------------------------
  const value = {
    session,
    profile,
    sessionLoading,
    sessionMessage,
    sessionError,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    fetchUserProfile,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
