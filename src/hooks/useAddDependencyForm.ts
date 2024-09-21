import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import useLogOut from '@/hooks/useLogOut';
import { FormData } from '@/interfaces/index';

const useAddDependencyForm = () => {
  const navigate = useNavigate();
  const logOut = useLogOut();
  const [isLoading, setIsLoading] = useState(false)
  const initialFormData: FormData = {
    nombre: '',
    pagina_fb: '',
    pertenece_a: 0,
    tipo: 0,
    status: '',
    siglas: '',
  };

  const [formData, setFormData] = useState<FormData>(() => {
    const savedFormData = localStorage.getItem('addDependencyFormData');
    return savedFormData ? JSON.parse(savedFormData) : initialFormData;
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [dependencias, setDependencias] = useState<{ value: number, label: string }[]>([]);

  useEffect(() => {
    fetchDependencias();
  }, []);

  useEffect(() => {
    localStorage.setItem('addDependencyFormData', JSON.stringify(formData));
  }, [formData]);

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

  const fetchDependencias = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/dependencia/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dependencias = response.data.map((dep: any) => ({
        value: dep.id,
        label: dep.nombre
      }));
      setDependencias(dependencias);
      setIsLoading(false)
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
      setIsLoading(false)
      if (error.response && error.response.status === 401) {
        mostrarModalSesionExpirada();
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    // Convertir a número si es necesario
    if (name === 'pertenece_a' || name === 'tipo') {
      newValue = parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};
    let hasErrors = false;

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = 'El nombre no debe contener números ni caracteres especiales.';
      hasErrors = true;
    }
    if (!/^[A-Z]{2,}$/.test(formData.siglas)) {
      newErrors.siglas = 'Las siglas deben contener al menos dos letras mayúsculas.';
      hasErrors = true;
    }
    if (!formData.pagina_fb.match(/^https?:\/\/(www\.)?facebook\.com\/.+$/)) {
      newErrors.pagina_fb = 'La URL no es válida';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    } else {
      await addDependencia();
      setFormData(initialFormData);
      setFormErrors({});
      localStorage.removeItem('addDependencyFormData');
    }
  };

  const addDependencia = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/dependencia/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Dependencia añadida exitosamente!');
        fetchDependencias();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos guardados correctamente.",
          showCloseButton: true,
          showConfirmButton: false,
          toast: true,
          customClass: {
            popup: 'custom-swal-small'
          }
        });
        navigate('/adminDependencias');
        setTimeout(() => {
          Swal.close();
        }, 4000);
        setIsLoading(false)
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
        throw new Error(`HTTP error! Status: ${response.status}`);
        setIsLoading(false)
      }
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
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  };

  return {
    formData,
    formErrors,
    dependencias,
    handleInputChange,
    handleSubmit,
    isLoading
  };
};

export default useAddDependencyForm;