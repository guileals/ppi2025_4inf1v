import styles from "./Product.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router";

// Componente que exibe um produto individual
// - mostra imagem, título, descrição e preço (formatado em BRL)
// - botão para adicionar ao carrinho usando CartContext

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div key={product.id} className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      {/* Formata o preço para BRL (R$) usando Intl.NumberFormat */}
      <p className={styles.productPrice}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
      {/* <Link to="/cart"> */}
      <button
        onClick={() => {
          addToCart(product);
        }}
        className={styles.productButton}
      >
        ADICIONAR AO CARRINHO
      </button>
      {/* </Link> */}
    </div>
  );
}
