import { useContext, useEffect, useState } from "react";
import styles from "./User.module.css";
import { SessionContext } from "../context/SessionContext";
import { CartContext } from "../context/CartContext";
import { supabase } from "../utils/supabase";
import { toast, Bounce } from "react-toastify";

export function User() {
  // Componente de área do usuário
  // Mostra informações do perfil e, se for admin, permite adicionar/remover produtos.
  // - useEffect: carrega produtos quando a sessão está disponível
  // - handleAddOrUpdate: adiciona ou atualiza um produto na tabela `product_1v`
  // - handleEdit: preenche o formulário para edição
  // - handleRemove: remove produto da loja e do carrinho, e exibe toasts
  const { session, profile, handleSignOut } = useContext(SessionContext);
  const { refreshProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", thumbnail: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [selectedToRemove, setSelectedToRemove] = useState("");
  const [removing, setRemoving] = useState(false);
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    if (!session) return;
    async function loadProducts() {
      setLoading(true);
      const { data, error } = await supabase.from("product_1v").select();
      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, [session]);

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    if (!profile || !profile.admin) return;

    try {
      if (editId) {
        const { error } = await supabase.from("product_1v").update({
          title: form.title,
          price: parseFloat(form.price || 0),
          thumbnail: form.thumbnail,
          description: form.description,
        }).eq("id", editId);
        if (error) throw error;
        setProducts((p) => p.map((it) => (it.id === editId ? { ...it, ...form, price: parseFloat(form.price) } : it)));
      } else {
        const { data, error } = await supabase.from("product_1v").insert([
          {
            title: form.title,
            price: parseFloat(form.price || 0),
            thumbnail: form.thumbnail,
            description: form.description,
          },
        ]).select().single();
        if (error) throw error;
        setProducts((p) => [data, ...p]);
        await refreshProducts();
        // Mostrar toast de sucesso quando um produto é criado
        toast.success("Produto criado com sucesso!", {
          autoClose: 1500,
          transition: Bounce,
        });
      }
      setForm({ title: "", price: "", thumbnail: "", description: "" });
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEdit(product) {
    setEditId(product.id);
    setForm({ title: product.title || "", price: String(product.price || ""), thumbnail: product.thumbnail || "", description: product.description || "" });
  }

  async function deleteProductFromDB(id) {
    if (!id) throw new Error('Invalid id');
    const { error } = await supabase.from("product_1v").delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  async function handleRemove(e) {
  e.preventDefault();

  const id = Number(selectedToRemove);
  if (!id || isNaN(id)) {
    alert("Selecione um produto válido.");
    return;
  }

  setRemoving(true);

  try {
    // 1. Remover o produto de product_1v
    const { error } = await supabase
      .from("product_1v")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao remover: " + error.message, { transition: Bounce });
      return;
    }

    // 2. Atualizar a lista de produtos na interface
    setProducts(prev => prev.filter(p => p.id !== id));

    // 3. Remover o produto do carrinho
    await supabase
      .from("cart")
      .delete()
      .eq("product_id", id);

    // 4. Atualizar o estado do carrinho no React
    // Aqui você deve usar o `refreshCart()` se tiver algo do tipo no seu contexto
    // Se você estiver usando `CartContext` para controlar o carrinho, adicione a função aqui
    await refreshProducts();  // Essa função pode ser específica para atualizar o carrinho na UI local

    setSelectedToRemove("");
    // Usar o mesmo estilo de notificação do registro
    toast.success("Produto removido!", { autoClose: 1500, transition: Bounce });
  } finally {
    setRemoving(false);
  }
}


  if (!session) {
    return (
      <div className={styles.container}>
        <h1>Usuário não autenticado!</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeHeader}>
        <h2 className={styles.welcomeTitle}>Bem-vindo</h2>
        <div className={styles.welcomeName}>{profile?.username}</div>
      </div>
      <div className={styles.userCard}>
        <div className={styles.userField}>
          <span className={styles.userLabel}>Nome</span>
          <span className={styles.userValue}>{profile?.username}</span>
        </div>
        <div className={styles.userField}>
          <span className={styles.userLabel}>Email</span>
          <span className={styles.userValue}>{profile?.email}</span>
        </div>
        <div className={styles.userField}>
          <span className={styles.userLabel}>Papel</span>
          {profile?.admin ? <span className={styles.adminBadge}>ADMIN</span> : <span className={styles.userTag}>Usuário</span>}
        </div>
      </div>

      {profile?.admin && (
        <div className={styles.adminCard}>
          <div className={styles.adminToggle}>
            <button
              className={styles.button + ' ' + (activeTab === "add" ? styles.tabActive : "")}
              type="button"
              onClick={() => setActiveTab("add")}
            >Adicionar</button>
            <button
              className={styles.button + ' ' + (activeTab === "remove" ? styles.tabActive : "")}
              type="button"
              onClick={() => setActiveTab("remove")}
            >Remover</button>
          </div>
          {activeTab === "add" && (
            <>
              <div className={styles.adminTitle}>Adicionar produto à loja</div>
              <form onSubmit={handleAddOrUpdate} className={styles.adminFormField}>
                <input className={styles.adminInput} placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input className={styles.adminInput} placeholder="Preço" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                <input className={styles.adminInput} placeholder="URL da imagem (thumbnail)" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
                <textarea className={styles.adminTextarea} placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <div className={styles.adminActions}>
                  <button className={styles.button} type="submit">Adicionar produto</button>
                </div>
              </form>
            </>
          )}
          {activeTab === "remove" && (
            <>
              <div className={styles.adminTitle}>Remover produto da loja</div>
              <form className={styles.adminFormField} onSubmit={handleRemove}>
                <label htmlFor="removeSelect" className={styles.userLabel}>Selecione o produto para remover:</label>
                <select
                  value={selectedToRemove}
                  onChange={e => setSelectedToRemove(Number(e.target.value))}
                >
                  <option value="">-- selecione --</option>
                  {products.map(prod => (
                    <option key={prod.id} value={prod.id}>{prod.title}</option>
                  ))}
                </select>
                <div className={styles.removeActions}>
                  <button className={styles.button} type="submit" disabled={removing || selectedToRemove === ""}>Remover</button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      <button className={styles.signOut} onClick={handleSignOut}>
        SAIR DA CONTA
      </button>
    </div>
  );
}
