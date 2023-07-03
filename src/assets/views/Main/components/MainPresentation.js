import React, { useEffect, useRef } from 'react'
import tvImage from '../../../img/tv.png';

const MainPresentation = () => {
  const noiseRef = useRef();

  useEffect(() => {
    showNoise(1000, 'noise-showed');
    showNoise(4000, 'noise-opaqued');
  })

  const showNoise = (timeout, className) => {
    let noise = noiseRef.current;
    if(noise){
      setTimeout(() => {
        noise.classList.add(className);
      }, timeout);
    }
  }

  return (
    <div className="tv fade-animation-0-5 a-delay-500 flexbox">
    <img src={tvImage} className="tv-image" alt="tv"/>
    <div className="noise" ref={noiseRef}></div>
  </div>
  )
}

export default MainPresentation