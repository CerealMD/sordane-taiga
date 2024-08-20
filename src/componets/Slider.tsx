// src/BooleanSlider.tsx
import React, { useEffect, useState } from 'react';
import '../css/BooleanSlider.css'; // Import CSS for styling

// Define the props interface
interface BooleanSliderProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const BooleanSlider: React.FC<BooleanSliderProps> = ({ initialChecked = true, onChange }) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="slider-container">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default BooleanSlider;
