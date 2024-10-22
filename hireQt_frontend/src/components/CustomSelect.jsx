import React, { useState, useEffect } from 'react';

const CustomSelect = ({ 
  placeholder = "Search", 
  dataSource, 
  onSelect
}) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (input) {
      fetchData(input);
    } else {
      setResults([]);
    }
  }, [input]);

  const fetchData = async (value) => {
    try {
      let data;
      if (typeof dataSource === 'string') {
        const response = await fetch(dataSource);
        data = await response.json();
      } else if (Array.isArray(dataSource)) {
        data = dataSource;
      } else {
        console.error("Invalid data source");
        return;
      }

      // Assuming the JSON structure is { "key": [...items] }
      const items = Array.isArray(data) ? data : Object.values(data)[0];

      if (Array.isArray(items)) {
        const filteredResults = items.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        console.error("Data source did not return an array");
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleClick = (item) => {
    setInput(item);
    setResults([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="bg-white w-full rounded-lg py-3 shadow-custom">
      <input
        className="bg-transparent border-0 rounded-none h-full w-full outline-none ml-1.5 text-xl"
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {results.length > 0 && (
        <div className="w-full bg-white flex flex-col shadow-custom rounded-lg mt-1 max-h-80 overflow-y-scroll">
          {results.map((item, id) => (
            <div
              key={id}
              className="py-2.5 px-2.5 cursor-pointer hover:bg-[#efefef]"
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;