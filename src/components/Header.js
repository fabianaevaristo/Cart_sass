import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function Header() {
  return(
    <div className="header">
      <div className="container">
        <a  href={`/carrinho`}><FontAwesomeIcon icon={faCartShopping} /></a>
        <a  href={`/favorito`}><FontAwesomeIcon icon={faHeart} /></a>
      </div>
    </div>
  )

}

export default Header;