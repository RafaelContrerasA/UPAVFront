import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import Swal from "sweetalert2";
import useLogOut from "./useLogOut";
import { useNavigate } from "react-router-dom";

interface User {
  id: number | null;
  nombre: string | null;
  apellido_paterno: string | null;
  apellido_materno: string | null;
  rol: number | null;
  correo: string | null;
  email?: string | null;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  new_password?: string;
  confirm_password?: string;
}

interface ProfileFormHook {
  user: User;
  updateUserProfile: (updatedUserData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useProfileForm = (): ProfileFormHook => {
  const { user, updateUser: updateUserContext } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logOut = useLogOut();
  const navigate = useNavigate();

  // Función para mapear los campos del usuario de React a los campos de Django
  const mapUserFieldsToDjangoFormat = (
    userData: Partial<User>
  ): Partial<User> => {
    return {
      email: userData.correo,
      username: userData.nombre,
      first_name: userData.nombre,
      last_name: `${userData.apellido_paterno}`,
    };
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

  const updateUserProfile = async (updatedUserData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }
    try {
      const mappedUserData = mapUserFieldsToDjangoFormat(updatedUserData);
      
      // Añadir lógica para incluir las contraseñas si están presentes
      if (updatedUserData.new_password && updatedUserData.confirm_password) {
        mappedUserData.new_password = updatedUserData.new_password;
        mappedUserData.confirm_password = updatedUserData.confirm_password;
      }

      console.log(
        "Datos actualizados del usuario en formato Django:",
        mappedUserData
      );

      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/auth/me/`,
        mappedUserData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualizamos el contexto del usuario si es necesario
      const updatedUser = {
        ...user,
        nombre: response.data.first_name,
        apellido_paterno: response.data.last_name,
        correo: response.data.email,
      };
      console.log(updatedUser);
      updateUserContext(updatedUser);
      console.log("Perfil actualizado:", response.data);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ha ocurrido un error inesperado. Inténtelo de nuevo.",
        showCloseButton: true,
        showConfirmButton: false,
        toast: true,
        customClass: {
          popup: 'custom-swal-small'
        }
      });
      setError(error.response?.data?.message || "Error desconocido");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { user, updateUserProfile, isLoading, error };
};

export default useProfileForm;
