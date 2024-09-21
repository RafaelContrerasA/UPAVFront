import React, { useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex items-center justify-center px-5 mt-2 py-3 bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-custom-guinda hover:bg-opacity-60 text-custom-vino font-gibson text-sm font-semibold hover:text-white rounded-lg cursor-pointer transition-colors duration-300"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaArrowAltCircleLeft
        className={`text-${isHovered ? 'white' : 'custom-vino'} text-xl mr-2`}
      /> {/* Ajusta el tamaño del ícono con 'text-xl' */}
      <span className="text-lg">Regresar</span> {/* Ajusta el tamaño del texto con 'text-xl' */}
    </button>
  );
};

export default BackButton;
