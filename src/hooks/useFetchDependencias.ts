import axios from 'axios';
import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import useLogOut from './useLogOut';
import { useNavigate } from 'react-router-dom';

interface Dependency {
  id: number;
  tipo: number;
  nombre: string;
}

const useFetchDependencias = () => {
  const [dependencias, setDependencias] = useState<Dependency[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [selectedDependency, setSelectedDependency] = useState<Dependency | null>(null);
  const logOut = useLogOut();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        mostrarModalSesionExpirada();
        return;
      }

      try {
        const dependenciasResponse = await axios.get(`${import.meta.env.VITE_URL}/dependencia/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dependenciasData = dependenciasResponse.data;
        setDependencias(dependenciasData);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          mostrarModalSesionExpirada();
        } else {
          setError("Error al obtener los datos");
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

    fetchData();
  }, []); // Dependencias añadidas

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedSection(value);
    setSelectedDependency(null);
  };

  const handleDependencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const dependency = dependencias.find(dep => dep.id === value) || null;
    setSelectedDependency(dependency);
  };

  const mostrarModalSesionExpirada = () => {
    Swal.fire({
      title: 'Sesión expirada',
      text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
      icon: 'warning',
      confirmButtonText: 'Iniciar sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate('/');
      }
    });
  };

  const filteredDependencias = useMemo(() => {
    return dependencias.filter(
      (dependencia) => selectedSection === 0 || dependencia.tipo === selectedSection
    );
  }, [dependencias, selectedSection]);

  return {
    error,
    isLoading,
    selectedSection,
    handleSectionChange,
    filteredDependencias,
    selectedDependency,
    handleDependencyChange,
  };
};

export default useFetchDependencias;
