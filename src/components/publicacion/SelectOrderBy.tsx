import React, { useState, ChangeEvent } from 'react';

interface SelectOrderByProps {
  onOrderChange: (order: string) => void;
}

const SelectOrderBy: React.FC<SelectOrderByProps> = ({ onOrderChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onOrderChange(newValue); // Notificar el cambio al padre
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-3 rounded-md ">
       <p className=" text-2xl">Ordenar Por:</p>
      <select
        id="selectOption"
        value={selectedOption}
        onChange={handleChange}
        className="mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
      >
        <option value="">Selecciona...</option>
        <option value="descReac">Por Mayor a Menor Reacciones</option>
        <option value="ascReac">Por Menor a Mayor Reacciones</option>
        <option value="Reci">Mas Recientes</option>
        <option value="Ant">Mas Antiguas</option>
      </select>
    </div>
  );
};

export default SelectOrderBy;
