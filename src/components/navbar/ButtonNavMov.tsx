import React from "react";
import { Link } from "react-router-dom";

interface ButtonNavMovProps {
  children: React.ReactNode;
  link: string;
  name: string;
  onClick: () => void;
}

const ButtonNavMov: React.FC<ButtonNavMovProps> = ({ link, name, children, onClick }) => {
  return (
    <Link to={link}>
      <button type="button" className=" w-full h-16 border-b active:bg-custom-guinda px-7 flex justify-left items-center gap-4 active:underline" onClick={onClick}>
        {children}
        <div className="text-center font-normal">{name}</div>
      </button>
    </Link>
  );
};

export default ButtonNavMov;