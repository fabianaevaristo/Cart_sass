import { useState, useEffect } from "react";
import api from "../services/api";

function ListCompra() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        
        const response = await api.get("/estoque");
        setProdutos(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchApi();
  }, []);

  return (
    <div>
      <h1>Lista de Compras</h1>
      {produtos.length > 0 ? (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <h3>{produto.modelo}</h3>
              <p>Marca: {produto.marca}</p>
              <p>Preço: R$ {(produto.preco).toFixed(2)}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <img src={produto.imagem[0]} alt={produto.modelo} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}

export default ListCompra;
