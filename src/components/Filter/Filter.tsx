import React from "react";

interface FilterSelectProps {
    options: { id: number; name: string }[];
    onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ options, onChange }) => {  
    
    return (
        <div className="flex items-center space-x-4">
            <select
                id="filterType"
                className="p-3 ml-2 flex items-center space-x-2 rounded bg-custom-vino text-white  focus:outline-none whitespace-nowrap"
                onChange={(e) => {
                    onChange(e.target.value);
                }}
            >
                <option value="" className="">Todos</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id} >{option.name}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
