import React from 'react';

export const ScrollArea = ({ children, className = '', ...props }) => (
  <div 
    className={`overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 ${className}`} 
    {...props}
  >
    {children}
  </div>
);