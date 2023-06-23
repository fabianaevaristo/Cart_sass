import React, { useEffect, useState } from "react";
import "../styles.css";

import Summary from "../Summary";
import TableRow from "../TableRow";
import PageHeader from "../layout/PageHeader";
import PageTitle from "../layout/PageTitle";

import { api } from '../provider';


function Carrinho() {
  const [cart, setCart] = useState([{id: 1, quantidade: 1}]);
  const [estoque, setEstoque] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/estoque");
      setEstoque(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getElementById  = (id) => {
    return estoque.filter((cartItem) => cartItem.id === id)[0];
  }

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
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
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

export default Carrinho;


