import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";

export function ProductList() {
  
  const { products, loading, error } = useContext(CartContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchInput = useRef(null);

  useEffect(() => {
    if(products) {
      setFilteredProducts(products);
    }
  }, [products]);

  function handleSearch() {
    const query = searchInput.current.value.toLowerCase();
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      )
    );
  }

  function handleClear() {
    searchInput.current.value = "";
    setFilteredProducts(products);
  }

  // Log apenas quando `products` mudar, e gravar um snapshot (JSON)
  // para evitar que o console mostre referências mutáveis depois.
  // useEffect(() => {
  //   // Só registrar quando houver produtos (evita log inicial com array vazio)
  //   if (!products || products.length === 0) return;
  //   try {
  //     const snapshot = JSON.parse(JSON.stringify(products));
  //     console.log("Products from supabase:", snapshot);
  //   } catch (err) {
  //     console.log("Products from supabase (could not stringify):", products);
  //   }
  // }, [products]);


  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          ref={searchInput}
          type="text"
          placeholder="Procurar produtos..."
          className={styles.searchInput}
          onChange={handleSearch}
        />
        <button className={styles.searchButton} onClick={handleClear}>
          Limpar
        </button>
      </div>
      <div className={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Carregando Produtos...</p>
        </div>
      )}
      {error && <p>❌ {error}</p>}
    </div>
  );
}
