import React, { useEffect, useState } from 'react';
import Carta from './Carta';
import './Tablero.css';

const cuadros = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', // React
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', // Java
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', // JavaScript
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', // Kotlin
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', // Python
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', // HTML
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', // CSS
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', // C
  ];

const Tablero = () => {
   const [aciertos, setAciertos] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState();
  const [finalizado, setFinalizado] = useState(false);
  const cuadrosJuntos = [...cuadros, ...cuadros];
  const cuadrosPrevios = cuadrosJuntos.map((valor) => ({
    imagen: valor,
    estado: 0,
  }));

  const [misCuadros, setMisCuadros] = useState([]);
  const [misTiradas, setMisTiradas] = useState([]);

  useEffect(() => {
    for (let i = cuadrosPrevios.length - 1; i > 0; i--) {
      const azar = Math.floor(Math.random() * (i + 1));
      [cuadrosPrevios[i], cuadrosPrevios[azar]] = [
        cuadrosPrevios[azar],
        cuadrosPrevios[i],
      ];
    }
    setMisCuadros([...cuadrosPrevios]);
  }, []);

  const manejarCarta = (indice) => {
    const existe = misTiradas.find((objeto) => objeto.indice === indice);
    const yaEncontrada = misCuadros[indice].estado;

    if (misTiradas.length < 2 && !existe && yaEncontrada === 0) {
      setMisTiradas([
        ...misTiradas,
        {
          imagen: misCuadros[indice].imagen,
          indice: indice,
        },
      ]);

      const provisional = [...misCuadros];
      provisional[indice].estado = 1;
      setMisCuadros(provisional);
    }
  };

  useEffect(() => {
    if (misTiradas.length === 2) {
      setIntentos(intentos + 1);
      if (misTiradas[0].imagen === misTiradas[1].imagen) {
        setMisTiradas([]);
        setAciertos(aciertos + 1);
        if (aciertos + 1 >= cuadros.length) {
          setMensaje('¡Has terminado el juego! Muy bien hecho.');
          setFinalizado(true);
        }
      } else {
        setTimeout(() => {
          const provisional = [...misCuadros];
          misTiradas.forEach((objeto) => {
            provisional[objeto.indice].estado = 0;
          });
          setMisCuadros(provisional);
          setMisTiradas([]);
        }, 2000);
      }
    }
  }, [misTiradas, aciertos, cuadros.length]);

  return (
    <>
      {finalizado && (
        <div className='panel'>
          <div className='texto'>
            <div className='mensaje'>{mensaje}</div>
            <button onClick={() => window.location.reload()}>Reiniciar</button>
          </div>
        </div>
      )}
      <div className='tablero'>
        {misCuadros.map((dato, index) => (
          <Carta
            key={index}
            imagen={dato.imagen}
            estado={dato.estado}
            manejarCarta={() => manejarCarta(index)}
          />
        ))}
      </div>
      <div className='aciertos'>
        {aciertos} aciertos de {intentos} intentos:{' '}
        {intentos > 0 && (
          <span className='intentos'>
            ({Math.round((aciertos * 100) / intentos)}% de aciertos)
          </span>
        )}
      </div>
    </>
  );
};

export default Tablero;
