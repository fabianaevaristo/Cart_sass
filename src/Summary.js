import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import api from "./services/api";

const Summary = ({ total }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cupons, setCupons] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyCupom = () => {
  
    const cupom = cupons.find( el => el.codigo == cupomValue)
    if(cupom){
      setDiscount(cupom.desconto)
    }

    handleCloseModal();
  };

  const handleChangeCupomValue = (event) => {
    setCupomValue(event.target.value);
  };

  useEffect(() => {
    async function fetchApi() {
      try {
        
        const response = await api.get("/cupom");
        setCupons(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchApi();
  }, []);

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