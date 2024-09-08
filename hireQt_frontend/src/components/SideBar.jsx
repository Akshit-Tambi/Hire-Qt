import React from 'react'
import InputRadio from './InputRadio'

const SideBar = ({handleChange}) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <div>
            <h4 className='text-lg fort-medium mb-2'>Location</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name='test' value="" id='test' onChange={handleChange}/>
                    <span className='checkmark'></span>All
                </label>
                <InputRadio handleChange={handleChange} value="London" title="London" name="test"/>
            </div>
        </div>
    </div>
  )
}

export default SideBar