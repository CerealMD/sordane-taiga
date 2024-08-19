import React, { useState } from 'react';
import '../css/dropdown.css'; // Import your CSS file for styling
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import ComboBoxPopUp from './comboBoxPopUp';
import { useSpinner } from './spinnerContext';

export interface DropdownItem {
    label: string;
    value: string;
  }
  
  export interface DropdownProps {
    items: DropdownItem[];
    onSelect: (value: string) => void; // Callback function when an item is selected
  }
const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  console.log(items)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (value: string) => {
      setSelectedItem(value);
      setIsOpen(false);
      onSelect(value);
    };
  
    return (
      <div className="dropdown">
        <button className="dropdown-button" onClick={handleToggle}>
          {selectedItem ? selectedItem : 'Select an item'}
        </button>
        {isOpen && (
          <div className="dropdown-content">
            {items.map((item) => (
              <div
                key={item.value}
                className="dropdown-item"
                onClick={() => handleSelect(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Dropdown;


