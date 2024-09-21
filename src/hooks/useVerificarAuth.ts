// useVerificarAuth.ts
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "@/context/UserContext";
import useLogOut from './useLogOut'; // Importa el hook useLogOut

const useVerificarAuth = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const logOut = useLogOut(); // Utiliza el hook useLogOut

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        logOut(); // Llama a la función de cierre de sesión si no hay token
        navigate('/');
        return;
      }

      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_URL}/auth/me/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        updateUser({
          id: userResponse.data.id,
          nombre: userResponse.data.first_name,
          apellido_paterno: userResponse.data.last_name,
          apellido_materno: '', // Actualizar con el valor correcto
          rol: 0, // Actualizar con el valor correcto
          correo: userResponse.data.email
        });
        // Si la solicitud fue exitosa, entonces el token es válido
      } catch (err) {
        // Si la solicitud falló, entonces el token no es válido o ha expirado
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
          icon: 'warning',
          confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
          if (result.isConfirmed) {
            logOut(); // Llama a la función de cierre de sesión
            navigate('/');
          }
        });
      }
    };

    verificarToken();
  }, [navigate, updateUser, logOut]); // Añade logOut a la lista de dependencias

  return null;
};

export default useVerificarAuth;
