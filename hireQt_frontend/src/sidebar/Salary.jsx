import React from 'react'
import InputRadio from '../components/InputRadio'

const Salary= ({ handleChange, selectedValue }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Expected CTC</h4>
            <div>
                <InputRadio handleChange={handleChange} value="" title="All" name="salary" checked={selectedValue === ""} />
                <InputRadio handleChange={handleChange} value="intership" title="6LPA-9LPA" name="salary" checked={selectedValue === "internship"} />
                <InputRadio handleChange={handleChange} value="entry" title="10LPA-14LPA" name="salary" checked={selectedValue === "entry"} />
                <InputRadio handleChange={handleChange} value="experience" title="15LPA +" name="salary" checked={selectedValue === "experience"} />
                
                
            </div>
        </div>
    )
}
export default Salary