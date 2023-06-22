import React from "react";
import PageQuantity from "./PageQuantity";

const TableRow = ({ data, handleRemoveItem, handleUpdateItem }) => {
  const handleDecrease = () => {
    handleUpdateItem(data.id, 'decrease');
  };

  const handleIncrease = () => {
    handleUpdateItem(data.id, 'increase');
  };

  return (
    <tr>
      <td>
        <div className="product">
          {data.imagem && <img src={data.imagem[0]} alt="" />}
          <div className="info">
            <div className="name">{data.modelo}</div>
            <div className="category">{data.marca}</div>
          </div>
        </div>
      </td>
      <td>{data.preco ? `R$ ${data.preco.toFixed(2)}` : ""}</td>
      <td>
        <PageQuantity
          itemId={data.id}
          handleUpdateItem={handleUpdateItem}
          quantidade={data.quantidade}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />
      </td>
      <td>
        <span>R$ {(data.quantidade * data.preco).toFixed(2)}</span>
      </td>
      <td>
        <button className="remove" onClick={() => handleRemoveItem(data)}>
          <i className="bx bx-x"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;