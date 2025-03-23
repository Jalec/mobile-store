import React from "react";

function Selector({ options, selectedValue, setSelectedValue, title }) {
  const handleChangeOption = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">{title}</label>
        <select
          value={selectedValue}
          onChange={(e) => handleChangeOption(e)}
          className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
        >
          {options?.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Selector;
