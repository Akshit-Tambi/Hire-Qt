import React from 'react'
import InputRadio from '../components/InputRadio'

const Location = ({ handleChange, selectedValue }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>
            <div>
                <InputRadio handleChange={handleChange} value="" title="All" name="location" checked={selectedValue === ""} />
                <InputRadio handleChange={handleChange} value="london" title="London" name="location" checked={selectedValue === "london"} />
                <InputRadio handleChange={handleChange} value="seattle" title="Seattle" name="location" checked={selectedValue === "seattle"} />
                <InputRadio handleChange={handleChange} value="madrid" title="Madrid" name="location" checked={selectedValue === "madrid"} />
                <InputRadio handleChange={handleChange} value="boston" title="Boston" name="location" checked={selectedValue === "boston"} />
            </div>
        </div>
    )
}

export default Location