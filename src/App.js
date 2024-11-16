import React, { useState, useEffect } from 'react';
import Tablero from './Tablero';
import './App.css'

function App() {
  const [cartas, setCartas] = useState([]);
  const [volteadas, setVolteadas] = useState([]);
  const [parejasEncontradas, setParejasEncontradas] = useState(0);

  useEffect(() => {
    const crearMazo = () => {
      const valores = [
        {id:1, imagen:'./imagenes/c.png'},
        {id:2, imagen:'./imagenes/css.png'},
        {id:3, imagen:'./imagenes/html.png'},
        {id:4, imagen:'./imagenes/java.png'},
        {id:5, imagen:'./imagenes/js.png'},
        {id:6, imagen:'./imagenes/kotlin.png'},
        {id:7, imagen:'./imagenes/python.png'},
        {id:8, imagen:'./imagenes/react.png'}
      ];
      const mazo = valores.concat(valores);
      for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
      }
      setCartas(
        mazo.map((carta, index) => ({
          ...carta,
          id: index, // Nuevo ID único
          volteada: false,
          encontrada: false,
        }))
      );
    };

    crearMazo();
  }, []);

  const manejarClicCarta = (idCarta) => {
    // Evita acciones si ya hay 2 cartas volteadas o la carta seleccionada ya está volteada
    if (volteadas.length === 2 || cartas[idCarta].volteada) return;
  
    // Voltea la carta seleccionada
    const nuevasCartas = cartas.map((carta) =>
      carta.id === idCarta ? { ...carta, volteada: true } : carta
    );
    setCartas(nuevasCartas);
  
    // Actualiza las cartas volteadas
    const nuevasVolteadas = [...volteadas, idCarta];
    setVolteadas(nuevasVolteadas);
  
    // Si hay dos cartas volteadas, compararlas
    if (nuevasVolteadas.length === 2) {
      const [primeraId, segundaId] = nuevasVolteadas;
      const primeraCarta = nuevasCartas[primeraId];
      const segundaCarta = nuevasCartas[segundaId];
  
      // Verifica si las imágenes coinciden
      if (primeraCarta.imagen === segundaCarta.imagen) {
        // Marca las cartas como encontradas
        setCartas((cartas) =>
          cartas.map((carta) =>
            carta.id === primeraId || carta.id === segundaId
              ? { ...carta, encontrada: true }
              : carta
          )
        );
        setParejasEncontradas((prev) => prev + 1);
        setVolteadas([]);
      } else {
        // Si no coinciden, voltearlas de nuevo después de un retraso
        setTimeout(() => {
          setCartas((cartas) =>
            cartas.map((carta) =>
              carta.id === primeraId || carta.id === segundaId
                ? { ...carta, volteada: false }
                : carta
            )
          );
          setVolteadas([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="app">
      <h1>Juego Memory</h1>
      <p>Parejas encontradas: {parejasEncontradas}</p>
      <Tablero cartas={cartas} manejarClicCarta={manejarClicCarta} />
    </div>
  );
};

export default App;