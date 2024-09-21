import React from 'react';

interface ButtonFilterProps {
  children: React.ReactNode;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({ children }) => {
  return (
    <button className={' bg-custom-guinda py-1 px-2 rounded-full'}>
      {children}
    </button>
  );
};

export default ButtonFilter;
