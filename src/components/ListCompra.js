import { useState, useEffect } from "react";
import api from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from "@fortawesome/free-solid-svg-icons";



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

  function handleAddCart(produto) {
    produto = {...produto, quantidade : 1}
    let controle = JSON.parse(localStorage.getItem('itemSalvo'));
    controle = controle ? [...controle.data, produto] : [produto]
    localStorage.setItem("itemSalvo",`{"data":${JSON.stringify(controle)}}`);
  } 



  return (
    <div className="container">
      <a  href={`/carrinho`}><FontAwesomeIcon icon={faCartShopping} /></a>
      <h1 className="header-titulo">Lista de Compras</h1>

      {produtos.length > 0 ? (
        <ul className="lit-compra">
          {produtos.map((produto) => (
            <li key={produto.id}>
              <h3>{produto.modelo}</h3>
              <p>Marca: {produto.marca}</p>
              <p>Preço: R$ {(produto.preco).toFixed(2)}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <div className="thumb">
                <img src={produto.imagem[0]} alt={produto.modelo} />
              </div>  
            <button onClick={ () => handleAddCart(produto)}><FontAwesomeIcon icon={faCartShopping} /></button>
            <button><FontAwesomeIcon icon={faHeart} /></button>
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
