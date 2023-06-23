import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Carrinho from "./components/Carrinho";
import ListCompra from "./components/ListCompra";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/carrinho" element={<Carrinho />}/>
          <Route path="/" element={<ListCompra />}/>
          
      </Routes>
    </BrowserRouter>
  )
}

export default App;