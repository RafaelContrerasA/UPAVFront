import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useLogOut from './useLogOut';

interface Log {
  id: number;
  idUsuario: number;
  nombreUsuario?: string;
  accion: string;
  fecha: string;
}

const useFetchLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const navigate = useNavigate();
  const logOut = useLogOut();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${import.meta.env.VITE_URL}/logs/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const sortedLogs = response.data.sort((a: Log, b: Log) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setLogs(sortedLogs);
        setIsLoading(false)
      } catch (error) {
        if (error.response?.status === 401) {
          mostrarModalSesionExpirada();
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
      } finally {
        setIsLoading(false)
      }
    };
    
    fetchLogs();
  }, []);
  

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

  return { logs, isLoading };
};

export default useFetchLogs;
