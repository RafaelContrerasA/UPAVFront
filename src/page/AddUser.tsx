import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import '../css/addUser.css';
import { useNavigate } from "react-router-dom";
import BackButton from '@/components/Button/BackButton';
import TextInputComponent from './../components/TextInputComponent';
import SelectComponent from './../components/SelectComponent';
import ButtonComponent from './../components/ButtonComponent';
import EmailInputComponent from '@/components/EmailInputComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import useLogOut from '@/hooks/useLogOut';
import { UserContext } from '@/context/UserContext';
import Loader from '@/components/loaders/Loader';
import sendEmail from '@/components/dependencies/sendEmail';


interface FormData {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  rol: string;
  password: string;
}

const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const logOut = useLogOut();
  const { user } = useContext(UserContext);

  const initialFormData: FormData = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    rol: '',
    password: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const generarContrasenia = () => {
    const longitud = 15;
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let contrasenia = "";
    for (let i = 0; i < longitud; i++) {
      contrasenia += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasenia;
  };

  const addUser = async () => {
    const generatedPassword = generarContrasenia();
    const last_name = `${formData.apellido_paterno} ${formData.apellido_materno}`;
    const dataToSend = {
      username: formData.nombre + formData.rol,
      email: formData.correo,
      password: generatedPassword,
      first_name: formData.nombre,
      last_name: last_name,
      rol: formData.rol,
    };
  
    console.log('Datos enviados:', dataToSend);  // Añadido para depuración
  
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        mostrarModalSesionExpirada();
        return;
      }
      setIsLoading(true);
      
      // Registrar el nuevo usuario
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/auth/register/`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        
        const newUser = response.data.user.first_name;
  
        // Crear el mensaje de log
        const logMessage = `${user.nombre } Añadió al usuario ${newUser}`;
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
            title: "Datos guardados correctamente.",
            showCloseButton: true,
            showConfirmButton: false,
            toast: true,
            customClass: {
              popup: 'custom-swal-small'
            }
          });
          
          navigate('/adminUsuarios');
          await sendEmail(formData.correo,'',dataToSend.password)
          setTimeout(() => {
            Swal.close();
          }, 4000);
        } catch (logError) {
          // Revertir el registro del nuevo usuario si falla la inserción del log
          await axios.delete(`${import.meta.env.VITE_URL}/auth/register/${newUser.id}/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          if (logError.response?.status === 401) {
            mostrarModalSesionExpirada();
          }
  
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al añadir usuario:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          mostrarModalSesionExpirada();
        }
      } else {
        console.error('Error al añadir usuario:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};
    let hasErrors = false;

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.nombre)) {
      newErrors['nombre'] = 'El nombre no debe contener números.';
      hasErrors = true;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.apellido_paterno)) {
      newErrors['apellido_paterno'] = 'El apellido paterno no debe contener números.';
      hasErrors = true;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.apellido_materno)) {
      newErrors['apellido_materno'] = 'El apellido materno no debe contener números.';
      hasErrors = true;
    }

    if (formData.rol === '') {
      newErrors['rol'] = 'Seleccione un tipo de usuario válido.';
      hasErrors = true;
    }

    if (formData.correo === '') {
      newErrors['correo'] = 'El correo electrónico es requerido.';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    } else {
      addUser();
      setFormData(initialFormData);
      setFormErrors({});
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col mb-2 w-full'>
          <div className='w-[85%]'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BackButton onClick={() => { navigate('/adminUsuarios') }} />
            </div>
            <div className='flex w-full py-[16px] px-[16px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
              <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default'>Añadir nuevo usuario</p>
            </div>
            <div className="mt-5 p-2 border-2 rounded-md w-full overflow-x-hidden overflow-y-auto bg-white">
              <div className="w-full">
                <h3 className="font-gibson text-[28px] font-semibold">Información del Perfil</h3>
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
                      label="Apellido Paterno"
                      name="apellido_paterno"
                      value={formData.apellido_paterno}
                      onChange={handleInputChange}
                      validate={/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/}
                      errmsg={'El apellido paterno no debe contener números ni caracteres especiales.'}
                      required
                    />
                    <TextInputComponent
                      label="Apellido Materno"
                      name="apellido_materno"
                      value={formData.apellido_materno}
                      onChange={handleInputChange}
                      validate={/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/}
                      errmsg={'El apellido materno no debe contener números ni caracteres especiales.'}
                      required
                    />
                  </div>
                  <EmailInputComponent
                    label="Correo electrónico"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-row">
                    <SelectComponent
                      label="Tipo de usuario"
                      name="rol"
                      required
                      value={formData.rol}
                      onChange={handleInputChange}
                      options={[
                        { value: 1, label: 'Superusuario' },
                        { value: 2, label: 'Revisor' },
                        { value: 3, label: 'Invitado' },
                      ]}
                    />
                    <ButtonComponent label="Registrar" onClick={handleSubmit} />
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

export default AddUserForm;
