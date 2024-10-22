import React from 'react'
import InputRadio from '../components/InputRadio'

const Experience = ({ handleChange, selectedValue }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Experience Level</h4>
            <div>
                <InputRadio handleChange={handleChange} value="" title="All" name="experience" checked={selectedValue === ""} />
                <InputRadio handleChange={handleChange} value="intership" title="Intership" name="experience" checked={selectedValue === "internship"} />
                <InputRadio handleChange={handleChange} value="entry" title="Entry" name="experience" checked={selectedValue === "entry"} />
                <InputRadio handleChange={handleChange} value="experience" title="Experience" name="experience" checked={selectedValue === "experience"} />
                
            </div>
        </div>
    )
}

export default Experience