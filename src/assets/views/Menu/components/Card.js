import React from 'react'

const Card = ({text, icon, bgClass = '', ...innerProps}) => {
  return (
    <div {...innerProps}>
        <div className={`card-content flex flex-col items-center justify-center m-2 ${bgClass}`}>
            <span>{icon}</span>
            <span className='text-white text-lg mt-3 font-bold'>{text}</span>
        </div>
    </div>
  )
}

export default Card