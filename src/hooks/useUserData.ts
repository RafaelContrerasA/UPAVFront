import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface UserData {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  rol: string;
  password: string;
  activo: string;
}

const useUserData = (userId: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/usuario/${userId}`);
        const data = await response.json();
        setUserData(data);
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
      }
    };

    fetchUserData();
  }, [userId]);

  return userData;
};

export default useUserData;
