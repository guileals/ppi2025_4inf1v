import { useContext } from "react";
import styles from "./User.module.css";
import { CartContext } from "../context/CartContext";

export function User() {
  const { session, handleSignOut } = useContext(CartContext);
  return (
    <div>
      {session ? (
        <div className={styles.container}>
          {session.user.user_metadata.admin ? (
            <h1>Admin Account</h1>
          ) : (
            <h1>User Account</h1>
          )}
          <div className={styles.userInfo}>
            <p>
              <strong>Username: </strong>
              {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email: </strong>
              {session.user.email}
            </p>
            <p>
              <strong>ID: </strong>
              {session.user.id}
            </p>
          </div>
          <button className={styles.button} onClick={handleSignOut}>
            SIGN OUT
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>User not signed in!</h1>
        </div>
      )}
    </div>
  );
}
