import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";


function Favorito(){
  const [ favorito, setFavorito] = useState([]);

  useEffect(() => {
    const controle = JSON.parse(localStorage.getItem('itemFavorito'));
    if(!!controle){
      setFavorito(controle.data)
    }
    
    
  }, []);

  function handleRemoverFavorite(produto){

    const updateFavorito = favorito.filter((cartItem) => cartItem.id !== produto.id);
    setFavorito(updateFavorito);
    localStorage.setItem("itemFavorito",`{"data":${JSON.stringify(updateFavorito)}}`);
  }

 return(

    <>
      <Header/>

      <div className="container">
      
          <h1 className="header-titulo">Favoritos</h1>


        {favorito.length > 0 ? (


        <ul>
        {favorito.map((produto) => (
          <li key={produto.id}>
          <h3>{produto.modelo}</h3>
          <p>Marca: {produto.marca}</p>
          <p>Preço: R$ {(produto.preco).toFixed(2)}</p>
          <p>Quantidade: {produto.quantidade}</p>
          <div className="thumb">
            <img src={produto.imagem[0]} alt={produto.modelo} />
          </div>  
      
        <button  onClick={ () => handleRemoverFavorite(produto)}><FontAwesomeIcon icon={faHeart} /></button>
        </li>
        ))}
        </ul>
        ) : ( 
            <div className="vazio">
              <p className="header-titulo"> Lista vazia </p>
              <a href="/"> Continuar comprando </a>
            </div>)}
      </div>
    </> 
  )

}

export default Favorito;