import React from 'react';
import Product from './Product';
import Retiro from './Retiro';
import './styles.css';  

function Main() {
  return (
    <div className="container">
     <div>
      <div className="box red-box">
        <h2>En preparación</h2>
        </div>
        <Product />
        </div>
     <div>
      <div className="box green-box">
        <h2>Listo para retirar</h2>
        </div>
             
        <Retiro />
        </div>
      
    </div>
  );
}

export default Main;
