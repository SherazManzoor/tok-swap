import React, { useState, useRef } from 'react';

const CustomSelect = ({ options, onSelect, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div className={`custom-select-header ${isOpen ? 'custom-select-header--open' : ''}`} onClick={handleToggleDropdown}>
        {selectedOption ? (
          <>
            <span className='custom-select-header-text'>
              <span className="custom-select-icon">
                <img src={selectedOption.icon} alt="icon" className='img-fluid' />
              </span>
              <span>{selectedOption.label}</span>
            </span>
          </>
        ) : (
          'Select an option'
        )}
        <span className={`custom-select-arrow ${isOpen ? 'custom-select-arrow--open' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="rotate-180 transform h-5 w-5 text-zinc-500"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"></path></svg>
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select-option"
              onClick={() => handleOptionClick(option)}
            >
              <span className="custom-select-icon">
                <img src={option.icon} alt="icon" className='img-fluid' />
              </span>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
