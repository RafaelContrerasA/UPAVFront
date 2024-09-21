import React from "react";
import { Link } from "react-router-dom";

interface ButtonNavProps {
  link: string;
  name: string;
}

const ButtonNav: React.FC<ButtonNavProps> = ({ link, name }) => {
  return (
    <Link to={link}>
      <div className="duration-300 h-10 px-7 hover:text-custom-vino hover:bg-custom-rosa active:bg-white rounded-full justify-center items-center gap-2.5 inline-flex hover:outline outline-offset-2 outline-custom-rosa">
        <div className="text-center font-normal">{name}</div>
      </div>
    </Link>
  );
};

export default ButtonNav;
