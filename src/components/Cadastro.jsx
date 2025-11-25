import { useState, useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import styles from "./Cadastro.module.css";

export default function Cadastro() {
  const { handleSignUp, sessionError, sessionLoading } =
    useContext(SessionContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Usa a função REAL do seu projeto original
    // Ela já cria o perfil e redireciona para /signin
    await handleSignUp(email, senha, nome);
  }

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {sessionError && (
          <p className={styles.error}>{sessionError}</p>
        )}

        <button disabled={sessionLoading} type="submit">
          {sessionLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Já tem conta? <a href="/signin">Entrar</a>
      </p>
    </div>
  );
}
