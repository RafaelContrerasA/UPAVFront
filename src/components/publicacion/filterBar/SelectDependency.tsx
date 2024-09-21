import React, { useState } from 'react';
import SelectComponent from '@/components/SelectComponent';
interface Dependency {
  id: number;
  tipo: number;
  nombre: string;
}

interface SelectDependencyProps {
  value: number;
  handleSectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dependencias: { id: number; tipo: number; nombre: string }[];
  selectedDependency: Dependency | null;
  handleDependencyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectDependency: React.FC<SelectDependencyProps> = ({
  value,
  handleSectionChange,
  dependencias,
  selectedDependency,
  handleDependencyChange,
}) => {
  const [showDep, setShowDep] = useState(false);

  return (
    <div className="bg-white p-3 rounded-md">
      <SelectComponent
        label="Tipo de Dependencia"
        name="pertenecea"
        required
        value={value}
        onChange={(e) => {
          handleSectionChange(e);
          setShowDep(true);
        }}
        options={[
          { value: 1, label: 'Gobernador' },
          { value: 2, label: 'Secretaria' },
          { value: 3, label: 'Sectorizada' },
          { value: 4, label: 'Titulares' },
        ]}
      />
      {showDep && (
        <div className="flex flex-col gap-1 pl-3 max-h-40 overflow-y-auto overflow-x-hidden">
          {dependencias.map((dependencia) => (
            <div key={dependencia.id} className="flex flex-row items-start gap-2 rounded-xl leading-tight">
              <input
                className="hover:cursor-pointer"
                type="radio"
                id={`dependencia-${dependencia.id}`}
                name="dependencia"
                value={dependencia.id}
                checked={selectedDependency?.id === dependencia.id}
                onChange={handleDependencyChange}
              />
              <label
                className="hover:cursor-pointer hover:text-custom-guinda"
                htmlFor={`dependencia-${dependencia.id}`}
              >
                {dependencia.nombre}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDependency;
