import React from 'react'
import '../components/Loader.css'

const Loader = () => {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
