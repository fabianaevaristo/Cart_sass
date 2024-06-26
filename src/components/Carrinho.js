import React, { useEffect, useState } from "react";
import "../styles.css";

import Summary from "../Summary";
import TableRow from "../TableRow";

import { fetchData } from '../services/api';
import Hero from "../layout/Hero";

function Carrinho({updateHeader}) {
  const [cart, setCart] = useState([]);
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      if(data){
        setEstoque(data)
      }
    })
  }, []);

  useEffect(() => {
    const controle = JSON.parse(localStorage.getItem('itemSalvo'));

    setCart(controle.data)
  }, []);

  const getElementById  = (id) => {
    return estoque.filter((cartItem) => cartItem.id === id)[0];
  }

  const handleRemoveItem = async (item) => {
    try {
      console.log('disparou handleRemoveItem');
      // Lógica para remover o item do carrinho (não envolvendo a API)
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
      localStorage.setItem("itemSalvo",`{"data":${JSON.stringify(updatedCart)}}`);
      updateHeader();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItem = (itemId, action) => {
  const maxQuantity = getElementById(itemId).quantidade
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      let newQuantity = item.quantidade;
      if (action === 'decrease') {
        newQuantity = newQuantity > 1 ? newQuantity - 1 : 1;
      }
      if (action === 'increase') {
        newQuantity = newQuantity == maxQuantity ? maxQuantity: newQuantity +1

      }
      return {
        ...item,
        quantidade: newQuantity,
      };
    }
    return item;
  }).filter(Boolean); // Filtra os itens vazios do carrinho

  setCart(updatedCart);
  localStorage.setItem("itemSalvo",`{"data":${JSON.stringify(updatedCart)}}`);
  updateHeader();
};
  
  const getTotal = () => {
    let sum = 0;
    console.log(cart)

    for (let item of cart ) {
      sum += item.preco * item.quantidade;
    }

    return sum;
  };

  const cartTotal = getTotal();

  return (
    <>
      <Hero texto="Carrinho"/>
      <main>
        <div className="content">
          <section>
            
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
                {cart.map((item) => {
                  let data = getElementById(item.id)
                  data = {...data, quantidade: item.quantidade}
                  return ( 
                  <TableRow
                    key={item.id}
                    data={data}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                )})}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan='5' style={{ textAlign: 'center' }}>
                      <b>Carrinho de compra vazio.</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              <a  className="button" href="/">Continuar comprado</a>
            </div>
          </section>
          <aside>
            <Summary cart={cart} total={cartTotal} updateHeader={updateHeader}/>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Carrinho;


