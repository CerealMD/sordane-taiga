import React, { useState, useRef, useEffect } from 'react';
import '../css/dropdown.css'; // Import your CSS file for styling
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import ComboBoxPopUp from './comboBoxPopUp';
import { useSpinner } from './spinnerContext';
import axios, { AxiosResponse } from 'axios';

export interface DropdownItem {
    label: string;
    value: string;
  }
  
  export interface DropdownProps {
    items: DropdownItem[];
    onSelect: (value: string) => void; // Callback function when an item is selected
  }
const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const token = localStorage.getItem('taiga-token');
  let test: any[] | AxiosResponse<any, any> = [];
  useEffect(() => {

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.taiga.io/api/v1/task-statuses?project=1575333', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "x-disable-pagination": 'True'
      },
    });
     test = response.data
  } catch (err: any) {
    console.log(err)

  }
  return
}

fetchData()
return


  })
     console.log(test)
    //  console.log(items)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

  
    const handleToggle = () => {
     console.log(test)
     console.log(isOpen)
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (value: string) => {
     console.log(value)
     console.log(test)
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
            {test.map((item:any) => (
              <div
                key={item.name}
                className="dropdown-item"
                onClick={() => handleSelect(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Dropdown;


// src/DropdownPopup.js
// import React, { useState, useRef, useEffect } from 'react';
// import '../css/dropdown.css'; // Import CSS for styling

// const DropdownPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Select an option');
//   const popupRef = useRef(null);

//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option: React.SetStateAction<string>) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   // Close the popup when clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (event: { target: any; }) => {
//       if (popupRef.current) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="dropdown-container">
//       <button className="dropdown-button" onClick={togglePopup}>
//         {selectedOption}
//       </button>
//       {isOpen && (
//         <div className="popup" ref={popupRef}>
//           <div className="popup-option" onClick={() => handleOptionClick('Option 1')}>Option 1</div>
//           <div className="popup-option" onClick={() => handleOptionClick('Option 2')}>Option 2</div>
//           <div className="popup-option" onClick={() => handleOptionClick('Option 3')}>Option 3</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownPopup;
