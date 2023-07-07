import { useState, useEffect } from "react";
import api from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";



function ListCompra() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        
        const response = await api.get("/estoque");
        setProdutos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchApi();
  }, []);

  function handleAddCart(produto) {
    let controle = JSON.parse(localStorage.getItem('itemSalvo')) || [];
    if(controle.data.some(e => e.id == produto.id)){
      return;
      
    }
    produto = {...produto, quantidade : 1}
    controle = controle ? [...controle.data, produto] : [produto]
    localStorage.setItem("itemSalvo",`{"data":${JSON.stringify(controle)}}`);
  } 

  function handleAddFavorite(produto){
    let controle = JSON.parse(localStorage.getItem('itemFavorito'))|| [];
    if(controle.data.some(e => e.id == produto.id)){
      return;

    }
    produto = {...produto, quantidade : 1}
    
    controle = controle ? [...controle.data, produto] : [produto]
    localStorage.setItem("itemFavorito",`{"data":${JSON.stringify(controle)}}`);
  }



  return (
    <div className="container">
      <Header/>
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
            <button  onClick={ () => handleAddFavorite(produto)}><FontAwesomeIcon icon={faHeart} /></button>
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
