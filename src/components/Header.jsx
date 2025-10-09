import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { cart, session } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>
        {session && (
          <Link to="/user" className={styles.welcomeMessage}>
            Welcome, {session.user.user_metadata.username} {session.user.user_metadata.admin && '⭐'}
          </Link>
        )}
      </div>

      <div className={styles.actions}>
        {!session && (
          <>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
        <ThemeToggle />
        <Link to="/cart" className={styles.link}>
          <div className={styles.cartInfo}>
            <div className={styles.cartIcon}>
              <ShoppingBasket size={32} />
              {cart.length > 0 && (
                <span className={styles.cartCount}>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>

            <p>
              Total: ${" "}
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
