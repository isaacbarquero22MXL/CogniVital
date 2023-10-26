import React from 'react'
import getIcon from '../../assets/img/svg'
import MenuOptions from './MenuOptions'

// this component is a reusable menu for each component
const MenuOptionsUtil = ( {className = "mt-[9rem]"}) => {
  return (
    <div className={`flexbox ${className}`}>
        <div className="flexbox">
          <h1 className="font-bold">¡Más actividades!</h1>
          <span className="ml-2">
            {getIcon("partyHorn", "fill-[#000] w-[48px]")}
          </span>
        </div>
        <MenuOptions />
      </div>
  )
}

export default MenuOptionsUtil