import React from 'react';

function Carta({ carta, manejarClicCarta }) {
  const handleCardClick = () => {
    if (!carta.volteada && !carta.encontrada) {
      manejarClicCarta(carta.id);
    }
  };

  return (
    <div className={`carta ${carta.volteada ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="front">
        <img src="./imagenes/fondo.png" alt="Reverso de la carta" />
      </div>
      <div className="back">
        {carta.volteada || carta.encontrada ? (
          <img src={carta.imagen} alt="Carta" />
        ) : null}
      </div>
    </div>
  );
}

export default Carta;