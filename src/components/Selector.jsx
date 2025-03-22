import React from "react";

function Selector({ options, selectedValue, setSelectedValue, title }) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">{title}</label>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Selector;
