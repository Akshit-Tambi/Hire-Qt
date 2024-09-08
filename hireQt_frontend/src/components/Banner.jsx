import React, { useState } from 'react'
import {FiSearch , FiMapPin} from "react-icons/fi"
import Button1 from './Button1'


const Banner = ({query , handleInputChange}) => {

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
        <h3 className='text-3xl font-bold'>Hey Akshit</h3>
        <h1 className='text-5xl font-bold mb-8'>
            Find Your <span className='text-green-400'>NEW JOB</span> Today
        </h1>
        
        <form>
            <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
                <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full'>
                    <input type='text' name="title" id='title' placeholder='What You Are Looking For ?' onChange={handleInputChange} value={query} 
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-grey-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'></input>
                    {<FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>}
                </div>
                <div className='flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
                    <input type='text' name="title" id='title' placeholder='Location'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-grey-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'></input>
                    {<FiMapPin className='absolute  mt-2.5 ml-2 text-gray-400'/>}
                </div>
                <Button1 text="Seach" className={"py-2 px-8 text-white md:rounded-s-none rounded"}></Button1>
            </div>
        </form>
    </div>

  ) 
}

export default Banner