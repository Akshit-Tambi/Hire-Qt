import React from 'react'
import Location from './Location'
import Salary from './Salary'
import Experience from './Experience'

const SideBar = ({ handleChange, selectedCategories }) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>
      <Location handleChange={handleChange} selectedValue={selectedCategories.location} />
      <Salary handleChange={handleChange} selectedValue={selectedCategories.salary} />
      <Experience handleChange={handleChange} selectedValue={selectedCategories.experience} />
    </div>
  )
}

export default SideBar