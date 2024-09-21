import React from "react";

interface ModalProps {
    user: User;
    onClose: () => void;
}

interface User {
    id: number;
    rol: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
  }  

const Modal: React.FC<ModalProps> = ({ user, onClose }) => {
    const roleNames: { [key: number]: string } = {
        1: "Superusuario",
        2: "Revisor",
        3: "Invitado",
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md shadow-md max-w-screen-sm w-full mx-4">
                <h2 className="text-xl font-bold mb-2">{`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</h2>
                <p className="mb-2">{`Correo: ${user.correo}`}</p>
                <p className="mb-4">{`Tipo de usuario: ${roleNames[user.rol]}`}</p>
                <button onClick={onClose} className="bg-custom-vino hover:bg-custom-guinda hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded w-full">
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default Modal;
