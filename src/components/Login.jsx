import styles from "./Login.module.css";
import { useForm } from "@mantine/form";

export default function Login({ value }) {

  const form = useForm
  return (
  <div className={styles.container}>
    <h1>{value}</h1>
  </div>
  );
}
