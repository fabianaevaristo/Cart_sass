import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function Header({quantidade}) {
  return(
    <div className="header">
      <div className="container">
        <a  href={`/carrinho`}>
          <FontAwesomeIcon icon={faCartShopping} /> 
          <span className='quantidade'>{quantidade}</span>
        </a>
        <a  href={`/favorito`}><FontAwesomeIcon icon={faHeart} /></a>
      </div>
    </div>
  )

}

export default Header;