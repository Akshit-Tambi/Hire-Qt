import React from 'react';

const Button1 = ({ text, onClick, className }) => {
return (
    <button className={`bg-green-500 text-white font-bold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-gray-900 transition duration-200 ${className}`}
    onClick={onClick}>
    {text}
<div className="flex justify-center items-center">
        <div
            className="bg-white h-0.5 w-2.5 relative transition duration-200"
            style={{
                '--arrow-width': '10px',
                '--arrow-stroke': '2px',
            }}
        >
        <span
            className="absolute border-white border-solid border-t-2 border-r-2"
            style={{
            top: '-3px',
            right: '0',
            padding: '3px',
            transform: 'rotate(45deg)',
            transition: 'right 0.2s',
            }}
        />
        </div>
    </div>
    </button>
);
};

export default Button1;
