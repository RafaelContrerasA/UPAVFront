import { ChangeEvent, useState, FC } from "react";
import { FaSearch } from "react-icons/fa";

interface InputBusquedaProps {
  placeholder?: string;
  width?: string;
  mdWidth?: string;
}

const InputBusqueda: FC<InputBusquedaProps> = ({ placeholder = "Buscar..." }) => {

  const [buscar, setBuscar] = useState("");

  const handleBuscar = (e: ChangeEvent<HTMLInputElement>) => {
    setBuscar(e.target.value);
  }

  return (
    <div className=" group justify-center items-center h-12 w-full gap-2 p-1 flex flex-row">
      <input
        type="text"
        name="search"
        id="search"
        onChange={handleBuscar}
        value={buscar}
        placeholder={placeholder}
        className={`border border-custom-vino w-full flex h-full px-4  rounded-full  focus:outline font-gibson`}
      />
      <div className=" h-full  aspect-square     rounded-full bg-custom-vino  duration-300 group-hover:bg-custom-rosa flex justify-center items-center cursor-pointer">
        <FaSearch className="fill-custom-rosa group-hover:fill-custom-vino  duration-300" />
      </div>

    </div>
  )
}

export default InputBusqueda;
