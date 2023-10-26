import React from 'react'

const HowToPlay = ({gameName = '', description, className=""}) => {
  return (
    <div className={`px-[1rem] mt-[4rem] sm:px-[4rem] flexbox max-w-7xl flex-column justify-content-start ${className}`}>
        <div className=' w-full font-bold text-[2.5rem] mb-[1.5rem]'>¿Cómo jugar {gameName}?</div>
        <div className='w-full text-[2rem]'>{description}</div>
    </div>
  )
}

export default HowToPlay