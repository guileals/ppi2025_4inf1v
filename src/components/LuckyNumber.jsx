import { useState } from "react";
import styles from "./LuckyNumber.module.css";

// Componente de exemplo para gerar números aleatórios "da sorte"
// Serve principalmente como demonstração/interação UI local
export function LuckyNumber() {
  //REACT HOOK - useState()
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [array, setArray] = useState([]);
  const [message, setMessage] = useState("");

  function handleClick() {
    var n = Math.ceil(Math.random() * 31);
    setLuckyNumber(n);

    if (array.includes(n)) {
      setMessage(`O número ${n} já foi escolhido!`);
    } else {
      setMessage("");
      setArray([...array, n]);
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? (
        <h1>Número da sorte = {luckyNumber}</h1>
      ) : (
        <h1>Número da sorte 🎲</h1>
      )}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClick}>
          Estou com sorte hoje!
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setLuckyNumber(0);
            setArray([]);
            setMessage("");
          }}
        >
          RESETAR 🔄
        </button>
      </div>
      {message && <p>{message}</p>}
      {array.length > 0 && (
        <div>
          <h3>Array de números da sorte:</h3>
          <p>[{array.toString()}]</p>
        </div>
      )}
    </div>
  );
}
