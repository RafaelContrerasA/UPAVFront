import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/addUser.css';
import TextInputComponent from './../components/TextInputComponent';
import SelectComponent from './../components/SelectComponent';
import ButtonComponent from './../components/ButtonComponent';
import BackButton from '@/components/Button/BackButton';
import useAddDependencyForm from '@/hooks/useAddDependencyForm';
import {UserContext} from '@/context/UserContext';
import Swal from 'sweetalert2';
import useLogOut from '@/hooks/useLogOut';
import Loader from '@/components/loaders/Loader';

const AddDependencyForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = useLogOut();
  const {
    formData,
    formErrors,
    dependencias,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useAddDependencyForm();

  useEffect(() => {
    // Verificar si el rol del usuario no es 1 (no autorizado)
    if (user.rol !== 1) {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'No tienes permisos para acceder a esta página.\nSe cerrará la sesión por seguridad.', // Agrega \n para el salto de línea
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        logOut();
      });
    }
  }, []);

  return (
    <>
    {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=' w-full flex justify-center items-center flex-col mb-2'>
        <div className='w-[85%]'>
          <div className='flex items-center'>
            <BackButton onClick={() => { navigate('/adminDependencias') }} />
          </div>
          <div className='flex w-full py-[16px] px-[16px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
            <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default'>Añadir nueva dependencia</p>
          </div>
          <div className=" p-2 border-2 rounded-b-md w-full overflow-x-hidden overflow-y-auto bg-white">
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
                    errmsg={'Las siglas deben contener al menos dos letras mayúsculas.'}
                    required
                  />
                </div>
                <div className="form-row">
                  <SelectComponent
                    label="Pertenece a"
                    name="pertenece_a"
                    value={formData.pertenece_a}
                    onChange={handleInputChange}
                    options={dependencias}
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
                  <ButtonComponent label="Registrar" type="submit" />
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

export default AddDependencyForm;
