import React, { useState } from 'react';

const CustomSelect = () => {
  const initialOptions = [
    { id: 1, imgSrc: 'https://via.placeholder.com/30', title: 'Option 1 Title', description: 'This is the description for option 1' },
    { id: 2, imgSrc: 'https://via.placeholder.com/30', title: 'Option 2 Title', description: 'This is the description for option 2' },
    { id: 3, imgSrc: 'https://via.placeholder.com/30', title: 'Option 3 Title', description: 'This is the description for option 3' },
  ];

  const [options, setOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newOption, setNewOption] = useState({  Agent1: "", Remark1: '', Date2: '' });

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleAddOption = () => {
    setOptions([...options, { ...newOption, id: options.length + 1 }]);
    setNewOption({  Agent1: "", Remark1: '', Date2: '' });
  };

  const handleRemoveOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleUpdateOption = (id) => {
    const updatedOptions = options.map(option => option.id === id ? selectedOption : option);
    setOptions(updatedOptions);
    setSelectedOption(null);
  };

  return (
    <div className="relative inline-block w-64">
      <div
        className="bg-gray-100 p-3 border border-gray-300 cursor-pointer flex items-center justify-between"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div>
          {selectedOption ? (
            <div className="flex items-center">
              <img src={selectedOption.imgSrc} alt={selectedOption.title} className="w-8 h-8 mr-2" />
              <div>
                <div className="font-bold">{selectedOption.title}</div>
                <div className="text-sm text-gray-500">{selectedOption.description}</div>
              </div>
            </div>
          ) : (
            'Select an option'
          )}
        </div>
        <div className="ml-2">&#9660;</div>
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-gray-100 border border-gray-300 mt-1 w-full z-10">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(option)}
            >
              <div className="flex items-center">
                <img src={option.imgSrc} alt={option.title} className="w-8 h-8 mr-2" />
                <div>
                  <div className="font-bold">{option.title}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </div>
              <button onClick={() => handleRemoveOption(option.id)} className="ml-2 text-red-500">X</button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Image URL"
          value={newOption.imgSrc}
          onChange={(e) => setNewOption({ ...newOption, imgSrc: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={newOption.title}
          onChange={(e) => setNewOption({ ...newOption, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newOption.description}
          onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleAddOption} className="bg-blue-500 text-white p-2 w-full">Add Option</button>
        {selectedOption && (
          <button onClick={() => handleUpdateOption(selectedOption.id)} className="bg-green-500 text-white p-2 w-full mt-2">Update Option</button>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
