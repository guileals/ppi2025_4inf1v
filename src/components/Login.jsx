import styles from "./Login.module.css";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast, Bounce } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

export function Login({ value }) {
  // User Context
  const {
    handleSignIn,
    handleSignUp,
    session,
    sessionLoading,
    sessionMessage,
    sessionError,
  } = useContext(CartContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(value); // "signin" or "register"
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  useEffect(() => {
    setMode(value);
  }, [value]);

  useEffect(() => {
    // Monitor changes in sessionMessage and sessionError
    if (sessionMessage) {
      toast.success(sessionMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        style: { fontSize: "1.5rem" },
        theme: localStorage.getItem("theme"),
        transition: Bounce,
      });
    } else {
      if (sessionError) {
        if (sessionError === "Email not confirmed") {
          toast.info(sessionError, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
            style: { fontSize: "1.5rem" },
            theme: localStorage.getItem("theme"),
            transition: Bounce,
          });
        } else {
          toast.error(sessionError, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
            style: { fontSize: "1.5rem" },
            theme: localStorage.getItem("theme"),
            transition: Bounce,
          });
        }
      }
    }
  }, [sessionMessage, sessionError]);
  
  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    // TODO: Buscar por REGEXP 
    const newErrors = {};
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.password) newErrors.password = "Password is required";
    if (mode === "register") {
      if (!formValues.username) newErrors.username = "Username is required";
      if (!formValues.confirmPassword)
        newErrors.confirmPassword = "Confirm Password is required";
      if (formValues.password !== formValues.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (mode === "signin") {
      handleSignIn(formValues.email, formValues.password);
    } else {
      handleSignUp(formValues.email, formValues.password, formValues.username);
    }
    setFormValues({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
    setErrors({});
    setShowPassword(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleTogglePassword = () => setShowPassword((show) => !show);

  return (
    <div className={styles.container}>
      <h1>{mode === "signin" ? "Sign In" : "Register"}</h1>
      <Form
        className={styles.form}
        errors={errors}
        onClearErrors={setErrors}
        onSubmit={handleSubmit}
      >
        <Field.Root name="email" className={styles.field}>
          <Field.Label className={styles.label}>Email</Field.Label>
          <Field.Control
            type="email"
            name="email"
            required
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={styles.input}
          />
          <Field.Error className={styles.error} />
        </Field.Root>

        {mode === "register" && (
          <Field.Root name="username" className={styles.field}>
            <Field.Label className={styles.label}>Username</Field.Label>
            <Field.Control
              type="text"
              name="username"
              required
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={styles.input}
            />
            <Field.Error className={styles.error} />
          </Field.Root>
        )}

        <Field.Root name="password" className={styles.field}>
          <Field.Label className={styles.label}>Password</Field.Label>
          <div className={styles.inputWrapper}>
            <Field.Control
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={styles.input}
            />
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleTogglePassword}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-controls="password"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <Field.Error className={styles.error} />
        </Field.Root>

        {mode === "register" && (
          <Field.Root name="confirmPassword" className={styles.field}>
            <Field.Label className={styles.label}>Confirm Password</Field.Label>
            <div className={styles.inputWrapper}>
              <Field.Control
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.iconBtn}
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-controls="password"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <Field.Error className={styles.error} />
          </Field.Root>
        )}
        <button
          type="submit"
          className={styles.button}
          disabled={sessionLoading}
        >
          {sessionLoading ? (
            <CircularProgress
              size={24}
              thickness={4}
              sx={{
                color: "var(--primary-contrast)",
                marginLeft: "1rem",
              }}
            />
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Register"
          )}
        </button>
      </Form>
      {mode === "register" && (
        <button onClick={() => setMode("signin")} className={styles.info}>
          Already have an account? Click here!
        </button>
      )}
      {mode === "signin" && (
        <button onClick={() => setMode("register")} className={styles.info}>
          Don't have an account? Click here!
        </button>
      )}
    </div>
  );
}