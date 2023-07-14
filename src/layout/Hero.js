import React from "react";

function Hero({texto}){
  return(
    <div className="hero">
      <div className="container">
        <h1 className="header-titulo">{texto}</h1>
      </div>
    </div>
  )
}

export default Hero;