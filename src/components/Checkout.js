import React from "react";
import Hero from "../layout/Hero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 
import "../styles.css";


function Checkout(){
  return (
    <>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCheck} className="icon-style" />
      </div>
      <div className="hero-container">
        <Hero texto="Compra concluída com sucesso" />
      </div>
        <a className="button continue-shopping" href="/">Continuar comprando</a>
    </>
    
  );
  
}




export default Checkout;