import React from 'react'
import InputRadio from '../components/InputRadio'

const Location = ({ handleChange, selectedValue }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>
            <div>
                <InputRadio handleChange={handleChange} value="" title="All" name="location" checked={selectedValue === ""} />
                <InputRadio handleChange={handleChange} value="gurgaon" title="Gurgaon" name="location" checked={selectedValue === "gurgaon"} />
                <InputRadio handleChange={handleChange} value="mumbai" title="Mumbai" name="location" checked={selectedValue === "mumbai"} />
                <InputRadio handleChange={handleChange} value="Bengaluru" title="Bengaluru" name="location" checked={selectedValue === "Bengaluru"} />
                <InputRadio handleChange={handleChange} value="hyderabad" title="Hyderabad" name="location" checked={selectedValue === "hyderabad"} />
            </div>
        </div>
    )
}

export default Location