import React from 'react';
import './Carta.css';

const Carta = ({ imagen, estado, manejarCarta }) => {
    const tapado = {
        backgroundImage: 'url(https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
      
  const descubierto = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <div
      className='carta'
      style={estado === 0 ? tapado : descubierto}
      onClick={manejarCarta}
    ></div>
  );
};

export default Carta;
