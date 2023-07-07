import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Carrinho from "./components/Carrinho";
import ListCompra from "./components/ListCompra";
import Favorito from "./components/Favorito";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/carrinho" element={<Carrinho />}/>
          <Route path="/" element={<ListCompra />}/>
          <Route path="/favorito" element={<Favorito/>} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App;