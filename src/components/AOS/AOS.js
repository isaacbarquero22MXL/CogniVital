import React, { useEffect } from 'react'
// Aos
import AOS from 'aos';
import 'aos/dist/aos.css';

// This component initialize AOS
const InitAOS = () => {
    useEffect(() => {
        // init AOS
        AOS.init();
        AOS.refresh();
    }, [])
  return (
   <></>
  )
}

export default InitAOS