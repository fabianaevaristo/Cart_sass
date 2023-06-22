import React from "react";

const PageQuantity = ({ itemId, handleUpdateItem, quantidade }) => {
  const handleDecrease = () => {
    handleUpdateItem(itemId, "decrease");
  };

  const handleIncrease = () => {
    handleUpdateItem(itemId, "increase");
  };

  return (
    <div className="qty">
      <button onClick={handleDecrease} disabled={quantidade <= 1}>
        <i className="bx bx-minus"></i>
      </button>
      <span>{quantidade}</span>
      <button onClick={handleIncrease}>
        <i className="bx bx-plus"></i>
      </button>
    </div>
  );
};

export default PageQuantity;