import React, {useState} from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import ModalEdit from "../dependencies/ModalEdit";
interface Dependencia {
  id: number;
  rol: number;
  nombre: string;
  url_facebook: string;
  tipo: string;
  siglas: string;
  status: string;

}

interface CardDepProps {
  dependencia: Dependencia;
  onDeleteDep: (userId: number) => void;
}

const CardDep: React.FC<CardDepProps> = ({ dependencia, onDeleteDep }) => {
  const handleDeleteUser = () => {
    onDeleteDep(dependencia.id); // Llamar a la función onDeleteUser con el ID del usuario a eliminar
    console.log("Eliminado");
  };

  return (
    <div className="flex justify-between hover:drop-shadow-lg duration-200 items-center p-4 bg-white rounded-lg shadow border  border-black ">
      <div className=" flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8  fill-gray-500 bg-slate-00" />
        <span className="text-lg font-medium font-gibson leading-tight ">
          {dependencia?.siglas} - {dependencia?.nombre}
          <div className={`bg-${dependencia?.status === 'activo' ? 'custom-rosa' : 'slate-400'} bg-opacity-0 w-fit flex rounded-3xl`}>
            <p className="text-sm font-normal leading-none ">Estatus: {dependencia?.status}
            </p>
          </div>
        </span>
      </div>
      <div className="flex ">
        <button className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-vino hover:bg-opacity-15 transition-all duration-200">
          <FaRegEdit className="w-5 h-5 fill-custom-vino" />
        </button>
        <button onClick={handleDeleteUser} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-vino hover:bg-opacity-15 transition-all duration-200">
          <RiDeleteBin5Line className="w-5 h-5  fill-custom-vino" />
        </button>
      </div>
    </div>
  );
};

export default CardDep;
