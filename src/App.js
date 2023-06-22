import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./styles.css";

import Summary from "./Summary";
import TableRow from "./TableRow";
import PageHeader from "./layout/PageHeader";
import PageTitle from "./layout/PageTitle";

import { api } from './provider';

function App() {
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/estoque");
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*const handleAddItem = async (item) => {
    try {
      console.log('disparou handleAddItem');
      // Lógica para adicionar o item ao carrinho (não envolvendo a API)
      const updatedCart = [...cart, item];
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleRemoveItem = async (item) => {
    try {
      console.log('disparou handleRemoveItem');
      console.log({ item });
      // Lógica para remover o item do carrinho (não envolvendo a API)
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItem = (itemId, action) => {
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      let newQuantity = item.quantidade;
      if (action === 'decrease') {
        newQuantity = newQuantity > 1 ? newQuantity - 1 : 1;
      }
      if (action === 'increase') {
        newQuantity += 1;
      }
      return {
        ...item,
        quantidade: newQuantity,
      };
    }
    return item;
  }).filter(Boolean); // Filtra os itens vazios do carrinho

  setCart(updatedCart);
};
  
  const getTotal = () => {
    let sum = 0;

    console.log('get total');

    for (let item of cart ) {
      sum += item.preco * item.quantidade;
    }

    return sum;
  };

  const cartTotal = getTotal();

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element/>
        </Routes>
      </Router>
      

      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className="content">
          <section>
            <button
              
            >
              Add to cart
            </button> 
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow
                    key={item.id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan='5' style={{ textAlign: 'center' }}>
                      <b>carrinho de compra vazio.</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary cart={cart} total={cartTotal}/>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;


/* onClick={() => handleAddItem({ id: 1, name: "Item 1", price: 10, quantity: 1 })}
              style={{ padding: '5px 10px', marginBottom: 15 }} */