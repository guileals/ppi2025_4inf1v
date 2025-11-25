import styles from "./Gerenciador.module.css";
import { useState } from "react";

export function GerenciadorProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleAdd(e) {
    e.preventDefault();
    if (editIndex !== null) {
      const novos = [...produtos];
      novos[editIndex] = { nome, preco: parseFloat(preco) };
      setProdutos(novos);
      setEditIndex(null);
    } else {
      setProdutos([...produtos, { nome, preco: parseFloat(preco) }]);
    }
    setNome("");
    setPreco("");
  }

  function handleEdit(index) {
    setEditIndex(index);
    setNome(produtos[index].nome);
    setPreco(produtos[index].preco);
  }

  function handleRemove(index) {
    setProdutos(produtos.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setNome("");
      setPreco("");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Gerenciar Produtos</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={e => setPreco(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <button type="submit">{editIndex !== null ? "Atualizar" : "Adicionar"}</button>
      </form>
      <ul>
        {produtos.map((p, i) => (
          <li key={i}>
            {p.nome} - R$ {p.preco.toFixed(2)}
            <button onClick={() => handleEdit(i)}>Editar</button>
            <button onClick={() => handleRemove(i)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}