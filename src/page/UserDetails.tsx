import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import '../css/addUser.css';
import BackButton from '@/components/Button/BackButton';
import TextInputComponent from './../components/TextInputComponent';
import SelectComponent from './../components/SelectComponent';
import ButtonComponent from './../components/ButtonComponent';
import EmailInputComponent from '@/components/EmailInputComponent';
import { useParams } from 'react-router-dom';
import Loader from '@/components/loaders/Loader';
import Swal from 'sweetalert2';

interface FormData {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  rol: string;
  password: string; //eliminar
  activo: string;
}

const AddUserForm: React.FC = () => {





  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/usuario/${id}`);
        const data = await response.json();
        setFormData(data);
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
  }, [id]);

  if (!formData) {
    return <div className=' flex w-full h-full justify-center items-center'>
      <Loader />
    </div>;
  }


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    const newErrors: Partial<FormData> = {};
    let hasErrors = false;

    // Validar nombre, apellido paterno y apellido materno
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.nombre)) {
      console.log('El nombre no debe contener números.');
      hasErrors = true;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.apellido_paterno)) {
      console.log('El apellido paterno no debe contener números.');
      hasErrors = true;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(formData.apellido_materno)) {
      console.log('El apellido materno no debe contener números.');
      hasErrors = true;
    }

    // Validar tipo de usuario seleccionado
    if (formData.rol === '') {
      newErrors['rol'] = 'Seleccione un tipo de usuario válido.';
      hasErrors = true;
    }

    // Validar correo electrónico
    if (formData.correo === '') {
      newErrors['correo'] = 'El correo electrónico es requerido.';
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    } else {
      handleSaveUser();
      // Formulario si todos los campos están llenos
      console.log('Formulario válido, enviando datos:', formData);
      setFormErrors({});
    }

  };

  const handleBack = () => {

    setFormErrors({});
  };

  const handleSaveUser = async () => {
    if (formData) {
      console.log('editando')
      try {
        await fetch(`http://localhost:3001/usuario/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setFormData(formData);
        
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
    }
  };

  return (
    <div className='flex justify-center items-center flex-col mb-2'>
      <div className='w-[85%]'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BackButton onClick={handleBack} />
        </div>
        <div className="arrow-container">

        </div>
        <div className='flex w-full py-[34px] px-[29px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
          <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default'>Modificar Usuario</p>
        </div>
        <div className="mt-5 p-2 border-2 rounded-md w-full overflow-x-hidden overflow-y-auto bg-white">
          <div className="w-full">
            <h3>Información del Perfil</h3>
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
                  errmsg={'El apellido Paterno no debe contener números ni caracteres especiales.'}
                  required
                />
                <TextInputComponent
                  label="Apellido Materno"
                  name="apellido_materno"
                  value={formData.apellido_materno}
                  onChange={handleInputChange}

                  validate={/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/}
                  errmsg={'El nombre no debe contener números ni caracteres especiales.'}
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
              <TextInputComponent
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}

                validate={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/}
                errmsg={'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y al menos un número'}
                required
              />
              <div className="form-row">
                <SelectComponent
                  label="Tipo de usuario"
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Superusuario', label: 'Superusuario' },
                    { value: 'Revisor', label: 'Revisor' },
                    { value: 'Invitado', label: 'Invitado' },
                  ]}
                />
                <ButtonComponent label="Editar" onClick={handleSaveUser} />
              </div>
            </form>
            {/* Mostrar errores de validación */}
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
  )
}


export default AddUserForm;
