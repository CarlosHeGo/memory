import React from 'react';
import Carta from './Carta';

function Tablero({ cartas, manejarClicCarta }) {
  return (
    <div className="tablero">
      {cartas.map((carta) => (
        <Carta key={carta.id} carta={carta} manejarClicCarta={manejarClicCarta} />
      ))}
    </div>
  );
}

export default Tablero;