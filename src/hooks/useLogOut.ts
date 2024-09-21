// useLogOut.ts
import { useContext } from 'react';
import { UserContext } from "@/context/UserContext";

const useLogOut = () => {
  const { updateUser, updateTokens, updateSesion } = useContext(UserContext);

  // Devuelve una función para cerrar sesión
  return function logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    localStorage.setItem('sesion', 'false');

    // Limpia el estado del usuario en el contexto
    updateUser({
      id: null,
      nombre: null,
      apellido_paterno: null,
      apellido_materno: null,
      rol: null,
      correo: null
    });
    updateTokens({ access: null, refresh: null });
    updateSesion(false);
  };
};

export default useLogOut;
