import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { SessionContext } from "../context/SessionContext";
import { ThemeToggle } from "./ThemeToggle";

// Cabeçalho da aplicação
// - mostra o nome da loja, links de autenticação e informações do carrinho

export function Header() {
  const { cart } = useContext(CartContext);
  const { session, profile } = useContext(SessionContext);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>
        {session && (
          <Link to="/user" className={styles.welcomeMessage}>
            Bem-vindo, {profile?.username || session.user.user_metadata.username} {profile?.admin || session.user.user_metadata?.admin ? '⭐' : ''}
          </Link>
        )}
      </div>

      <div className={styles.actions}>
        {!session && (
          <>
            <Link to="/signin" className={styles.link}>
              Entrar
            </Link>
            <Link to="/register" className={styles.link}>
              Cadastrar
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
              {/* Formata o total do carrinho como BRL */}
              Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                cart.reduce((total, product) => total + product.price * product.quantity, 0)
              )}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}