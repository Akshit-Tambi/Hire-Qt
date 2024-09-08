import React from 'react';

const Flashcard = ({ image, name , text }) => {
  return (
    <div className="w-72 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center">
      <div className="w-full h-128 overflow-hidden rounded-t-lg">
        <img src={image} alt="Flashcard Image" className="w-full h-full object-contain transform scale-125" style={{ objectPosition: 'top', clipPath: 'inset(0 0 30% 0)' }} />
      </div>
      <div className="">
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
      <div className="">
        <p className="text-lg text-slate-700">{text}</p>
      </div>
    </div>
  );
};

export default Flashcard;