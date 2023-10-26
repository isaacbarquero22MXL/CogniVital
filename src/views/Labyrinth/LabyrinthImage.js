import React, { useEffect, useState } from 'react'

const LabyrinthImage = ({src}) => {
    //Hook
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = require(`./../../assets/img/labyrinths/${src}`);
  }, [src]);

  return (
    <>
        {!imageLoaded ? (
        <p className='font-bold text-2xl h-[75vh] flexbox'>Cargando Imagen...</p>
      ) : (
        <img src={require(`./../../assets/img/labyrinths/${src}`)} className="labyrinth-image animate-fade" />
      )}
    </>
  )
}

export default LabyrinthImage