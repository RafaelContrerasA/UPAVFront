import React, { useState, useRef, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";

interface SearchInputPubProps {
    onSearchChange: (searchTerm: string) => void;
}

const SearchInputPub: React.FC<SearchInputPubProps> = ({ onSearchChange }) => {
    const [showKeywords, setShowKeywords] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>(["Agua", "Exposicion","Michoacan", "Morelia","Festival","Patzcuaro"]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowKeywords(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const simulatedSuggestions = ["Agua", "Exposicion","Michoacan", "Morelia","Festival","Patzcuaro"].filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(simulatedSuggestions);
        onSearchChange(value)
        setShowKeywords(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        onSearchChange(suggestion);
        setShowKeywords(false);
    };

    return (
        <div className="relative w-full" ref={inputRef}>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onFocus={() => setShowKeywords(true)}
                onChange={handleInputChange}
                className="px-4 py-2 w-full border border-[#6A0F49] rounded-full focus:outline-none pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pr-0">
                <IoSearchCircle className="w-10 h-10 text-gray-300" />
            </span>
            {((suggestions.length > 0) && showKeywords) && (
                <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-full">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInputPub;
