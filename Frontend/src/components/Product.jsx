import React, { useState, useEffect } from 'react';

function fetchDataFromServer() {
  return fetch("http://localhost:3010/apipedidos")
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error al obtener datos:', error);
      return null;
    });
}

function Product() {
  const [products, setProductState] = useState([]);

  const fetchData = () => {
    fetchDataFromServer().then((result) => {
      if (result && JSON.stringify(result) !== JSON.stringify(products)) {
        setProductState(result);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (        
    <div className='contenedor-numeros'>
      {products.map((product) => (
        <div key={product.id} className="square-producto">
          <p className="largeFont">{product.user_id}</p>
        </div>
      ))}
    </div>
  );
}

export default Product;
