import React, { useState } from "react";
import CustomModal from "./CustomModal";

const Summary = ({ total }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyCupom = () => {
    if (cupomValue === "cupom123") {
      setDiscount(10); // Aplica um desconto de 10%
    } else {
      setDiscount(0); // Cupom inválido, desconto é 0
    }

    handleCloseModal();
  };

  const handleChangeCupomValue = (event) => {
    setCupomValue(event.target.value);
  };

  return (
    <>
      <div className="box">
        <header>Resumo da compra</header>
        <div className="info">
          <div>
            <span>Sub-total</span>
            <span>R$ {total}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            <button onClick={handleOpenModal}>
              Adicionar cupom de desconto
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {total - (total * discount) / 100}</span>
        </footer>
      </div>
      <button>finalizar compra</button>

      {isModalOpen && (
        <CustomModal handleCloseModal={handleCloseModal}>
          <h2>Adicionar cupom de desconto</h2>
          <input
            type="text"
            value={cupomValue}
            onChange={handleChangeCupomValue}
          />
          <button onClick={handleApplyCupom}>Aplicar cupom</button>
        </CustomModal>
      )}
    </>
  );
};

export default Summary;