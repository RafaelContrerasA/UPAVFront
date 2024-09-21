import React, { useContext, useState } from 'react'
import useProfileForm from '@/hooks/useProfileForm'
import { UserContext } from '@/context/UserContext'
import Swal from 'sweetalert2';
import useLogOut from '@/hooks/useLogOut';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Perfil = () => {
  const { user } = useContext(UserContext); // Obtiene el usuario inicial del contexto
  const [nombre, setNombre] = useState(user.nombre || '');
  const [apellidoPaterno, setApellidoPaterno] = useState(user.apellido_paterno || '');
  const [apellidoMaterno] = useState(user.apellido_materno || '');
  const [correo, setCorreo] = useState(user.correo || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { updateUserProfile, isLoading, error } = useProfileForm();

  const logOut = useLogOut();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación de contraseñas
    if (newPassword && newPassword !== confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Las nuevas contraseñas no coinciden",
        showCloseButton: true,
        showConfirmButton: false,
        toast: true,
        timer: 4000,
        customClass: {
          popup: 'custom-swal-small'
        }
      });
      return;
    }

    // Enviar los datos actualizados al custom hook
    try {
      await updateUserProfile({
        nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        correo,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados correctamente.",
        showCloseButton: true,
        showConfirmButton: false,
        toast: true,
        timer: 4000,
        customClass: {
          popup: 'custom-swal-small'
        }
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          mostrarModalSesionExpirada();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Hubo un error al actualizar tu perfil',
            text: error.message,
            showCloseButton: true,
            showConfirmButton: false,
            toast: true,
            timer: 4000,
            customClass: {
              popup: 'custom-swal-small'
            }
          });
        }
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Hubo un error al actualizar tu perfil',
          text: "Error desconocido",
          showCloseButton: true,
          showConfirmButton: false,
          toast: true,
          timer: 4000,
          customClass: {
            popup: 'custom-swal-small'
          }
        });
      }
    }
  };

  const mostrarModalSesionExpirada = () => {
    Swal.fire({
      title: 'Sesión expirada',
      text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
      icon: 'warning',
      confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate('/');
      }
    });
  };

  return (
    <div className='flex justify-center items-center flex-col mb-2 w-full'>
      <div className='w-[90%]'>
        <div className='flex w-full py-[16px] px-[16px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
          <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default uppercase'>Perfil</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-t-0 rounded-b w-full overflow-x-hidden overflow-y-auto"
        >
          <div className="border-dashed border border-gray-600 p-3 flex flex-col md:grid gap-2 md:grid-cols-2">
            <p className="font-gibson text-[28px] font-semibold col-span-full">Información de perfil</p>

            <label htmlFor="name" className="font-gibson text-[24px]">
              Nombre(s)
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="rounded p-2 border h-[2rem] border-custom-vino md:row-start-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="apellido" className="font-gibson text-[24px] grid-cols-3 grid-rows-2">
              Apellidos
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              className="rounded p-2 border h-[2rem] border-custom-vino"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />

            <label htmlFor="email" className="font-gibson text-[24px] ">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded p-2 border h-[2rem] border-custom-vino row-start-5 col-span-full"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="mt-4 border-dashed border border-gray-600 p-3 flex flex-col gap-2 md:grid grid-cols-2">
            <p className="font-gibson text-[28px] font-semibold col-span-full">Cambiar contraseña</p>

            <label htmlFor="currentPassword" className="font-gibson text-[24px] ">
              Contraseña actual
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="rounded p-2 border h-[2rem] border-custom-vino row-start-3"
            />

            <label htmlFor="newPassword" className="font-gibson text-[24px] row-start-4">
              Nueva contraseña
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="rounded p-2 border h-[2rem] border-custom-vino row-start-5 "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword" className="font-gibson text-[24px] row-start-4 col-start-2">
              Confirma contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="rounded p-2 border h-[2rem] border-custom-vino row-start-5 col-start-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div>{error}</div>}
          <div className='w-full flex mt-4 md:justify-end justify-center'>
            <button type='submit' disabled={isLoading}
              className="p-2 ml-2 text-center space-x-2 rounded hover:bg-opacity-90 bg-[#4A001F] text-white  focus:outline-none md:w-auto w-full whitespace-nowrap">
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>




      </div>
    </div>
  )
}

export default Perfil