import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  label: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick, label, children }) => {
  return (
    <div className='p-2 h-16 mt-5 flex w-full sm:w-fit '>
      <button className="flex h-full flex-row w-full    p-3  justify-center  gap-1 text-sm items-center register-button  rounded bg-custom-vino text-white cursor-pointer hover:opacity-90 transition-all duration-100" style={{ whiteSpace: 'nowrap' }} onClick={onClick}>
      {children}
      {label}
    </button>
    </div>
  );
};

export default ButtonComponent;