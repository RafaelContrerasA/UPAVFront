import React, { useState, ChangeEvent } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[]; // Nuevo prop para las opciones
  required: boolean;
}

const SelectComponent: React.FC<SelectProps> = ({ label, name, value, onChange, options, required = false }) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  // console.log(value);
  
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(e);

    if (required && selectedValue === '') {
      setLocalError(`Seleccione un ${label.toLowerCase()} válido.`);
    } else {
      setLocalError(undefined);
    }
  };

  const handleBlur = () => {
    if (value === '') {
      setLocalError(`Seleccione un ${label.toLowerCase()} válido.`);
    } else {
      setLocalError(undefined);
    }
  };

  return (
    <div className={`flex flex-col  input-group ${localError ? 'input-error' : ''}`}>
      <label htmlFor={name} className="font-gibson text-[24px]">{label}:</label>
      <select
        className='bg-custom-vino h-11 text-white w-1/2 text-base rounded-lg'
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required={required}
      >
        <option value="" className='font-gibson font-bold'>Seleccione...</option>
        {/* Mapear sobre las opciones y renderizar cada una como un <option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value} className='font-gibson'>{option.label}</option>
        ))}
      </select>
      {localError && <p className="error-message">{localError}</p>}
    </div>
  );
};

export default SelectComponent;
