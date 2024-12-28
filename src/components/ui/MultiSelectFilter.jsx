import React, { useState } from 'react';


export function MultiSelectFilter ({ options, onFilterChange })  {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (option) => {
    let newSelectedOptions;
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

  return (
    <Select
      multiple
      value={selectedOptions}
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};


