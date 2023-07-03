import React from 'react'

const CoverCard = ({ text, ...innerProps }) => {
  return (
    <div { ...innerProps } >
        <p className='text-white font-bold'>
            { text }
        </p>
    </div>
  )
}

export default CoverCard