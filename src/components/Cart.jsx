import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Trash } from "lucide-react";

// Componente do Carrinho
// - lista itens do carrinho (do contexto)
// - permite alterar quantidade, remover itens e limpar o carrinho

export function Cart() {
  const { cart, updateQtyCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div className={styles.cart}>
      <h2>Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index} className={styles.cartItem}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              {/* Formata preço para BRL */}
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
              <div className={styles.quantityControls}>
                <button
                  disabled={product.quantity <= 1}
                  onClick={() =>
                    updateQtyCart(product.id, product.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    updateQtyCart(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className={styles.removeButton}
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={clearCart} className={styles.removeButton}>
          LIMPAR CARRINHO <Trash />
        </button>
      )}
    </div>
  );
}
