import React, { useEffect, useRef } from 'react'

const MainPresentation = () => {
  const noiseRef = useRef();

  return (
    <div className="tv fade-animation-0-5 a-delay-500 flexbox">
    <div className="noise" ref={noiseRef}></div>
  </div>
  )
}

export default MainPresentation