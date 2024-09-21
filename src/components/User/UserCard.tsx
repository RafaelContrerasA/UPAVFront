import React, { useContext } from "react";
import { VscEye } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IconType } from 'react-icons';
import { UserContext } from "@/context/UserContext";

interface UserCardProps {
  user: User;
  onDeleteUser: (userId: number) => void;
  onEdit?: (id: number) => void; // Hacer la función de edición opcional
  onViewUser?: (user: User) => void; // Nueva función para manejar la visualización de usuario
  icon: IconType;
  photoUrl?: string;
}

interface User {
  //Ambos
  id: number;
  nombre?: string;
  //Usuarios
  rol?: number;
  apellido_paterno?: string;
  apellido_materno?: string;
  correo?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  // Dependencias
  url_facebook?: string;
  tipo?: number;
  siglas?: string;
  status?: string;
  pertenecea?: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDeleteUser, onEdit, icon, onViewUser, photoUrl }) => {
  const { user: currentUser } = useContext(UserContext);

  const handleEditDependencia = () => {
    if (onEdit) {
      onEdit(user.id);
      console.log('Ver dependencia: ' + user.id + " " + user.nombre);
    }
  };

  const handleDeleteUser = () => {
    onDeleteUser(user.id); // Llamar a la función onDeleteUser con el ID del usuario a eliminar
    console.log('Eliminado');
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow border border-black">
      <div className="w-8 h-8 rounded-full mr-4 flex items-center justify-center">
        {photoUrl ? (
          <img src={photoUrl} alt="User Photo" className="w-7 h-7" />
        ) : (
          React.createElement(icon, { className: 'w-7 h-7 text-gray-600' })
        )}
      </div>
      <span className="text-lg font-medium truncate">
        {user.nombre} {user.first_name} {user.last_name}
      </span>
      {currentUser.rol === 1 && (
        <div className="flex ml-auto">
          {user.correo ? (
            <button
            title="ver"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-rosa hover:bg-opacity-40 hover:text-[#4A001F]"
              onClick={() => onViewUser && onViewUser(user)}
            >
              <VscEye className="w-5 h-5 text-[#4A001F]" />
            </button>
          ) : (
            <button
            title="editar"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-rosa hover:bg-opacity-40 hover:text-[#4A001F]"
              onClick={handleEditDependencia}
            >
              <FaRegEdit className="w-5 h-5 text-[#4A001F]" />
            </button>
          )}
          <button
          title="eliminar"
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-rosa hover:bg-opacity-40 hover:text-[#4A001F]"
            onClick={handleDeleteUser}
          >
            <RiDeleteBin5Line className="w-5 h-5 text-[#4A001F] fill-custom-vino" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
