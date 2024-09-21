import { useState, useEffect, ChangeEvent, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../css/addUser.css';
import TextInputComponent from './../components/TextInputComponent';
import SelectComponent from './../components/SelectComponent';
import ButtonComponent from './../components/ButtonComponent';
import BackButton from '@/components/Button/BackButton';
import axios from "axios";
import useLogOut from "@/hooks/useLogOut";
import Swal from "sweetalert2";
import Loader from "@/components/loaders/Loader";
import { Dependencia } from './AdminDependencias';
import { UserContext } from '@/context/UserContext';

// Define the structure of the form data
interface FormData {
  nombre: string;
  pagina_fb: string;
  siglas: string;
  status: string;
  pertenece_a: number;
  tipo: number;
}

const EditDependency = () => {
  // State to store form errors
  const [formErrors] = useState<Partial<FormData>>({});

  // Extract the ID from URL parameters
  const { id } = useParams();

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const logOut = useLogOut();
  const { user } = useContext(UserContext);

  // State to store the list of dependencies
  const [dependencias, setDependencias] = useState<{ value: number, label: string }[]>([]);
  const [oldDependencia, setOldDependencia] = useState("");

  // Initial form data
  const initialFormData: FormData = {
    nombre: '',
    pagina_fb: '',
    siglas: '',
    status: '',
    pertenece_a: 0,
    tipo: 0,
  };

  // State to manage the form data
  const [formData, setFormData] = useState<FormData>(() => {
    const savedFormData = localStorage.getItem('editDependencyFormData');
    return savedFormData ? JSON.parse(savedFormData) : initialFormData;
  });

  useEffect(() => {
    console.log("Data: ", formData);

  }, [formData])


  // Fetch dependencies when the component mounts
  useEffect(() => {
    const fetchDependencias = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        mostrarModalSesionExpirada();
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dependencia/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dependencias = response.data.map((dep: Dependencia) => ({
          value: dep.id,
          label: dep.nombre
        }));
        setDependencias(dependencias);
      } catch (error) {
        console.error('Error al obtener datos de dependencias:', error);
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
    setOldDependencia(formData.nombre)
    fetchDependencias();
  }, []);

  // Show session expired modal
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

  // Fetch the dependency data when the ID changes
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    const fetchDependencia = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/dependencia/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFormData({ ...response.data });
        localStorage.setItem('editDependencyFormData', JSON.stringify(response.data));
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          mostrarModalSesionExpirada();
        }
        if (error.response && error.response.status) {
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

    fetchDependencia();
  }, [id]);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('editDependencyFormData', JSON.stringify(formData));
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    // Convert to number if necessary
    if (name === 'pertenecea' || name === 'tipo') {
      newValue = parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: newValue });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const token = localStorage.getItem('access_token');
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }
  
    try {
      setIsLoading(true);
  
      // Obtener el estado actual de la dependencia antes de realizar cambios
      const currentDependencyResponse = await axios.get(`${import.meta.env.VITE_URL}/dependencia/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const currentDependencyData = currentDependencyResponse.data;
  
      // Realizar la actualización de la dependencia
      const updateResponse = await axios.patch(`${import.meta.env.VITE_URL}/dependencia/${id}/`,
        { ...formData, tipo: formData.tipo },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (updateResponse.status === 200) {
        // Insertar el log de editar
        const logMessage = `${user.nombre} Editó la dependencia ${formData.siglas}`;
        // const trimmedLogMessage = logMessage.substring(0, 50); // Asegurar que el mensaje tiene máximo 50 caracteres
  
        // Obtener la fecha y hora actual en formato ISO 8601
        const currentDate = new Date().toISOString();
  
        try {
          await axios.post(`${import.meta.env.VITE_URL}/logs/`, {
            accion: logMessage,
            fecha: currentDate,
            id_usuario: user.id
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
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
          localStorage.removeItem('editDependencyFormData');
          setTimeout(() => {
            Swal.close();
          }, 4000);
        } catch (logError) {
          // Revertir los cambios realizados en la dependencia
          await axios.patch(`${import.meta.env.VITE_URL}/dependencia/${id}/`,
            { ...currentDependencyData },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          );
  
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
        }
      } else {
        throw new Error(`HTTP error! Status: ${updateResponse.status}`);
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
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    if (user.rol !== 1) {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'No tienes permisos para acceder a esta página.\nSe cerrará la sesión por seguridad.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        logOut();
      });
    }
  }, [])


  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col mb-2'>
          <div className='w-[85%]'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BackButton onClick={() => { navigate('/adminDependencias') }} />
            </div>
            <div className="arrow-container"></div>
            <div className='flex w-full py-[34px] px-[29px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
              <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default'>Editar dependencia</p>
            </div>
            <div className="mt-5 p-2 border-2 rounded-md w-full overflow-x-hidden overflow-y-auto bg-white">
              <div className="w-full">
                <h3 className="font-gibson text-[28px] font-semibold">Información de la Dependencia</h3>
                <form onSubmit={handleSubmit}>
                  <TextInputComponent
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    validate={/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/}
                    errmsg={'El nombre no debe contener números ni caracteres especiales.'}
                    required
                  />
                  <div className="form-row">
                    <TextInputComponent
                      label="URL de Facebook"
                      name="pagina_fb"
                      value={formData.pagina_fb}
                      onChange={handleInputChange}
                      validate={/^https?:\/\/(www\.)?facebook\.com\/.+$/}
                      errmsg={'La URL no es válida'}
                      required
                    />
                    <TextInputComponent
                      label="Siglas"
                      name="siglas"
                      value={formData.siglas}
                      onChange={handleInputChange}
                      validate={/^[A-Z]{2,}$/}
                      errmsg={'Las siglas no son válidas'}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <SelectComponent
                      label="Pertenece a"
                      name="pertenecea"
                      required
                      value={formData.pertenece_a}
                      onChange={handleInputChange}
                      options={dependencias}
                    />
                  </div>
                  <div className="form-row">
                    <SelectComponent
                      label="Tipo de dependencia"
                      name="tipo"
                      required
                      value={formData.tipo}
                      onChange={handleInputChange}
                      options={[
                        { value: 1, label: 'Gobernador' },
                        { value: 2, label: 'Secretaria' },
                        { value: 3, label: 'Sectorizada' },
                        { value: 4, label: 'Titular' },
                      ]}
                    />
                  </div>
                  <div className="form-row">
                    <SelectComponent
                      label="Status"
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      options={[
                        { value: 'VERIFICADA', label: 'VERIFICADA' },
                        { value: 'SIN VERIFICAR', label: 'SIN VERIFICAR' },
                      ]}
                    />
                    <ButtonComponent label="Guardar" type="submit" />
                  </div>
                </form>
                {Object.keys(formErrors).length > 0 && (
                  <div className="error-box">
                    <ul>
                      {Object.entries(formErrors).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDependency;
