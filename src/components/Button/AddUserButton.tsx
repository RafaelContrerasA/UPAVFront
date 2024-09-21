import React from "react";
import { IoAddCircle } from "react-icons/io5";

interface AddUserButtonProps {
  onClick: () => void;
  titulo: string; // Prop para recibir el título dinámico
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onClick, titulo }) => {
  return (
    <button
      className="p-2 ml-2 flex items-center space-x-2 rounded bg-custom-vino text-white  focus:outline-none whitespace-nowrap"
      onClick={onClick}
    >
      <span className="truncate">{titulo}</span>
      <IoAddCircle className="w-6 h-6" />
    </button>
  );
};

export default AddUserButton;
