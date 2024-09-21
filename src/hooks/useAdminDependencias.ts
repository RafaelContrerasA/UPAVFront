// src/hooks/useAdminDependencias.ts
import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useLogOut from "@/hooks/useLogOut";
import { Dependencia } from "@/interfaces/index";
import { UserContext } from "@/context/UserContext";

const tipoNames: { id: number; name: string }[] = [
  { id: 1, name: "Gobernador" },
  { id: 2, name: "Secretarias" },
  { id: 3, name: "Sectorizada" },
  { id: 4, name: "Titulares" }
];

const useAdminDependencias = () => {
  const navigate = useNavigate();
  const logOut = useLogOut();
  const { user } = useContext(UserContext)
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<number | string>(""); // Cambiado de string a number o cadena vacía
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditDependencia = (dependenciaId: number) => {
    navigate(`/editDependencia/${dependenciaId}`);
  }

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

  const handleDeleteDependency = async (dependenciaId: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }
  
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        setIsLoading(true);
  
        // Obtener los detalles de la dependencia antes de eliminarla
        const responseDependencia = await axios.get(`${import.meta.env.VITE_URL}/dependencia/${dependenciaId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const dependencia = responseDependencia.data;
  
        // Eliminar la dependencia
        await axios.delete(`${import.meta.env.VITE_URL}/dependencia/${dependenciaId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        // Actualizar el estado de las dependencias
        const updatedDependencies = dependencias.filter((dependencia) => dependencia.id !== dependenciaId);
        setDependencias(updatedDependencies);
  
        // Crear el mensaje de log
        const logMessage = `${user.nombre} Eliminó la dependencia ${dependencia.siglas}`;
        const trimmedLogMessage = logMessage.substring(0, 50); // Asegurar que el mensaje tiene máximo 50 caracteres
  
        // Obtener la fecha y hora actual en formato ISO 8601
        const currentDate = new Date().toISOString();
  
        try {
          // Insertar el log
          await axios.post(`${import.meta.env.VITE_URL}/logs/`, {
            accion: trimmedLogMessage,
            fecha: currentDate,
            id_usuario: user.id
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Dependencia "${dependencia.nombre}" eliminada correctamente.`,
            showCloseButton: true,
            showConfirmButton: false,
            toast: true,
            customClass: {
              popup: 'custom-swal-small'
            }
          });
        } catch (logError) {
          // Revertir la eliminación de la dependencia si falla la inserción del log
          await axios.post(`${import.meta.env.VITE_URL}/dependencia/`, {
            ...dependencia
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Ha ocurrido un error al guardar el log. Los cambios han sido revertidos.",
            showCloseButton: true,
            showConfirmButton: false,
            toast: true,
            customClass: {
              popup: 'custom-swal-small'
            }
          });
  
          // Volver a agregar la dependencia eliminada al estado
          setDependencias([...updatedDependencies, dependencia]);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          mostrarModalSesionExpirada();
        }
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
      setIsLoading(false);
    }
  };
  
  const fetchDependencias = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/dependencia/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);

      setDependencias(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
    }
  };

  useEffect(() => {
    fetchDependencias();
  }, []);

  return {
    dependencias,
    searchTerm,
    filterType,
    isLoading,
    handleSearchChange,
    setFilterType,
    handleDeleteDependency,
    handleEditDependencia,
    tipoNames
  };
};

export default useAdminDependencias;
