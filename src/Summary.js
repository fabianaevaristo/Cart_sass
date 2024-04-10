import React, { useState, useEffect } from "react";
import CustomModal from "./CustomModal";
import { fetchCupom } from "./services/api"
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Summary = ({ total, updateHeader }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cupomValue, setCupomValue] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cupons, setCupons] = useState([]);
  const navigate = useNavigate();

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
    fetchCupom().then((data) => {
      if(data){
        setCupons(data)
        
      }
    })
  }, []);

  function finalizarCompra(){
    localStorage.setItem("itemSalvo",`{"data":[]}`);
    navigate("/checkout");
    updateHeader();
  }



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
      <button className="button" onClick={finalizarCompra}>Finalizar compra</button>

      {isModalOpen && (
        <CustomModal handleCloseModal={handleCloseModal}>
          <h2>Adicionar cupom de desconto</h2>
          <input className="input-cupom"
            type="text"
            value={cupomValue}
            onChange={handleChangeCupomValue}
          />
          <button className="button continue-shopping"  onClick={handleApplyCupom}>Aplicar cupom</button>
        </CustomModal>
      )}
    </>
  );
};

export default Summary;