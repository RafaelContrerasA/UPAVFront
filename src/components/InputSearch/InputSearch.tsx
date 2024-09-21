import React, { ChangeEvent } from "react";
import { IoSearchCircle } from "react-icons/io5";

interface SearchInputProps {
    searchTerm: string;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={onSearchChange}
                className="px-4 py-2 w-full border border-[#6A0F49] rounded-full focus:outline-none pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pr-0">
                <IoSearchCircle className="w-10 h-10 text-gray-300" />
            </span>
        </div>
    );
};

export default SearchInput;
