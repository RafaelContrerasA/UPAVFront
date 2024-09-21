import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';
import Swal from 'sweetalert2';

interface ApiResponse {
  access: string;
  refresh: string;
  // Define aquí las propiedades de tu respuesta de la API
}

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtén el contexto
  const { updateTokens, updateSesion, updateUser } = useContext(UserContext);

  const login = async (email: string, password: string): Promise<ApiResponse | void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<ApiResponse>('http://127.0.0.1:8000/api/auth/login/', {
        email,
        password
      });

      // Guardar los tokens en el localStorage
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Guardar el estado de la sesión en el localStorage
      localStorage.setItem('sesion', 'false');

      // Guardar los tokens en el contexto
      updateTokens({ access, refresh });
      updateSesion(true);

      // Actualizar el estado de la sesión en el localStorage
      localStorage.setItem('sesion', 'true');

      const userResponse = await axios.get('http://127.0.0.1:8000/api/auth/me/', {
        headers: { Authorization: `Bearer ${access}` }
      });      

      updateUser({
        id: userResponse.data.id,
        nombre: userResponse.data.first_name,
        apellido_paterno: userResponse.data.last_name,
        apellido_materno: '', // Actualizar con el valor correcto
        rol: userResponse.data.rol, // Actualizar con el valor correcto
        correo: userResponse.data.email
      });

      // Crear el mensaje de registro
      const logMessage = `${userResponse.data.first_name + ' ' + userResponse.data.last_name} Inicio sesión`;

      // Obtener la fecha y hora actual en formato ISO 8601
      const currentDate = new Date().toISOString();

      await axios.post(`${import.meta.env.VITE_URL}/logs/`, {
        accion: logMessage,
        fecha: currentDate,
        id_usuario: userResponse.data.id
      }, {
        headers: { Authorization: `Bearer ${access}` }
      });

      setIsLoading(false);

      // Devolver los tokens
      return userResponse.data;
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
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
      } else {
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
      }
    }
  };





  return { login, isLoading, error };
};

export default useAuth;