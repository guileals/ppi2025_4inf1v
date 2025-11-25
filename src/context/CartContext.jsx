import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    // Recupera o carrinho do localStorage se disponível
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const { session } = useContext(SessionContext);

  // Função para carregar os produtos da tabela 'product_1v'
  async function refreshProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("product_1v").select();
    if (error) {
      setError(`Erro ao carregar produtos: ${error.message}`);
    } else {
      setProducts(data); // Atualiza os produtos no estado
    }
    setLoading(false);

    if (session && session.user) {
      // Carregar os itens do carrinho do banco de dados se o usuário estiver logado
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("*, product_1v(*)")
        .eq("user_id", session.user.id);

      if (cartError) {
        console.error("Erro ao carregar o carrinho:", cartError.message);
      } else {
        const mapped = cartData.map((row) => ({
          id: row.product_id,
          title: row.product_1v?.title || "",
          price: row.product_1v?.price || 0,
          thumbnail: row.product_1v?.thumbnail || "",
          quantity: row.quantity,
        }));
        setCart(mapped);
      }
    }
  }

  // Carregar produtos ao montar a aplicação (mesmo sem sessão).
  // O carregamento do carrinho (associado ao usuário) continuará
  // sendo feito quando a `session` estiver disponível.
  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quando a sessão mudar, chamar refreshProducts novamente para garantir
  // que itens relacionados ao usuário (carrinho) sejam recarregados.
  useEffect(() => {
    if (session) {
      refreshProducts();
    }
  }, [session]);

  // Persistir o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // Ignorar erros de escrita (por exemplo, limite de armazenamento)
    }
  }, [cart]);

  // Função para adicionar produto ao carrinho
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (session && session.user) {
      (async () => {
        try {
          const { data: existing } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", session.user.id)
            .eq("product_id", product.id)
            .maybeSingle();

          if (existing) {
            const newQty = existing.quantity + 1;
            await supabase
              .from("cart")
              .update({ quantity: newQty })
              .eq("id", existing.id);
            setCart((prev) =>
              prev.map((it) =>
                it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
              )
            );
          } else {
            await supabase.from("cart").insert([
              {
                user_id: session.user.id,
                product_id: product.id,
                quantity: 1,
              },
            ]);
            setCart((prev) => [...prev, { ...product, quantity: 1 }]);
          }
        } catch (err) {
          console.error("Erro ao adicionar ao carrinho no Supabase:", err);
        }
      })();
    } else {
      if (existingProduct) {
        updateQtyCart(product.id, existingProduct.quantity + 1);
      } else {
        const next = [...cart, { ...product, quantity: 1 }];
        setCart(next);
        localStorage.setItem("cart_guest", JSON.stringify(next));
      }
    }
  }

  // Função para remover produto do carrinho
  function removeFromCart(productId) {
    if (session && session.user) {
      (async () => {
        try {
          await supabase
            .from("cart")
            .delete()
            .eq("user_id", session.user.id)
            .eq("product_id", productId);
          setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        } catch (err) {
          console.error("Erro ao remover do carrinho:", err);
        }
      })();
    } else {
      const next = cart.filter((item) => item.id !== productId);
      setCart(next);
      localStorage.setItem("cart_guest", JSON.stringify(next));
    }
  }

  // Função para atualizar quantidade de produto no carrinho
  function updateQtyCart(productId, quantity) {
    if (session && session.user) {
      (async () => {
        try {
          await supabase
            .from("cart")
            .update({ quantity })
            .eq("user_id", session.user.id)
            .eq("product_id", productId);
          setCart((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
          );
        } catch (err) {
          console.error("Erro ao atualizar quantidade no carrinho:", err);
        }
      })();
    } else {
      const next = cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
      setCart(next);
      localStorage.setItem("cart_guest", JSON.stringify(next));
    }
  }

  // Função para limpar o carrinho
  function clearCart() {
    if (session && session.user) {
      (async () => {
        try {
          await supabase.from("cart").delete().eq("user_id", session.user.id);
          setCart([]);
        } catch (err) {
          console.error("Erro ao limpar carrinho:", err);
        }
      })();
    } else {
      setCart([]);
      localStorage.removeItem("cart_guest");
    }
  }

  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    refreshProducts: refreshProducts,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
