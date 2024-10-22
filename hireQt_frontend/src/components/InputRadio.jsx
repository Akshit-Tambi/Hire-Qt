import React from 'react'

const InputRadio = ({ handleChange, value, title, name, checked }) => {
  return (
    <label className='sidebar-label-container'>
      <input 
        type="radio" 
        name={name} 
        value={value} 
        onChange={handleChange} 
        checked={checked}
      />
      <span className='checkmark'></span>{title}
    </label>
  )
}

export default InputRadio