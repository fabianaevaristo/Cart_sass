import React, {useState, useEffect} from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Carrinho from "./components/Carrinho";
import ListCompra from "./components/ListCompra";
import Favorito from "./components/Favorito";
import Checkout from "./components/Checkout";
import Header from "./components/Header";

function App() {

  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    handleUpdateHeader();

  }, []);

  const handleUpdateHeader = () => {
    const controle = JSON.parse(localStorage.getItem('itemSalvo'));
    if(controle) {
      return setQuantidade(controle.data.length)
    }

    setQuantidade(0);
  }
  
  return (
    <>
    <Header quantidade={quantidade} />

    <BrowserRouter>
      <Routes>
          <Route path="/carrinho" element={<Carrinho updateHeader={handleUpdateHeader} />}/>
          <Route path="/" element={<ListCompra updateHeader={handleUpdateHeader} />}/>
          <Route path="/favorito" element={<Favorito/>} />
          <Route path="/checkout" element={<Checkout/>} />          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;