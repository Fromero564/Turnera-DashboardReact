import React, { useState, useEffect } from 'react';

function fetchDataFromServer() {
  return fetch("http://localhost:3010/apiretiros")
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error al obtener datos:', error);
      return null;
    });
}

function Retiro() {
  const [retiros, setRetiroState] = useState([]);

  const fetchData = () => {
    fetchDataFromServer().then((result) => {
      if (result && JSON.stringify(result) !== JSON.stringify(retiros)) {
        setRetiroState(result);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (        
    <div className='contenedor-numeros'>
      {retiros.map((retiro) => (
        <div key={retiro.id} className="square-retiro">
          <p className="largeFont">{retiro.user_id}</p>
        </div>
      ))}
    </div>
  );
}

export default Retiro;
