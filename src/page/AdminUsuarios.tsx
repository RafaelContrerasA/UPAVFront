import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/User/UserCard";
import SearchInput from "@/components/InputSearch/InputSearch";
import ButtonComponent from "@/components/ButtonComponent";
import { MdAddCircleOutline } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import useLogOut from '@/hooks/useLogOut';
import Loader from "@/components/loaders/Loader";
import FilterSelect from "@/components/Filter/Filter";
import { UserContext } from "@/context/UserContext";
import { FaUser } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';
import AddUserButton from "@/components/Button/AddUserButton";

interface User {
  id: number;
  rol: number;
  first_name: string;
  last_name: string;
  correo: string;
}

const roleNames: { [key: number]: string } = {
  1: "Superusuario",
  2: "Revisor",
  3: "Invitado",
};

const AdminUsuarios = () => {
  const navigate = useNavigate();
  const logOut = useLogOut();
  const { user } = useContext(UserContext);

  useEffect(() => {
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

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('');

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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${import.meta.env.VITE_URL}/auth/users/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const mappedUsers = response.data.map((user: any) => ({
        id: user.id,
        rol: user.rol,
        first_name: user.first_name,
        last_name: user.last_name,
        correo: user.email,
      }));

      setUsers(mappedUsers);
      setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        mostrarModalSesionExpirada();
      } else {
        setError(error.message);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          await axios.delete(`${import.meta.env.VITE_URL}/auth/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario eliminado exitosamente.",
            showCloseButton: true,
            showConfirmButton: false,
            toast: true,
            customClass: {
              popup: 'custom-swal-small'
            }
          });
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
        } finally {
          setIsLoading(false);
        }
      }
    });
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (role: string) => {
    setFilterRole(role);
  };

  const handleViewUser = (user: User) => {
    const userRole = roleNames[user.rol] || "Desconocido";
    const userIconHtml = renderToString(<FaUser size={50} />);

    Swal.fire({
      title: 'Detalles del Usuario',
      html: `
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                ${userIconHtml}
            </div>
            <p><strong>Nombre:</strong> ${user.first_name}</p>
            <br>
            <p><strong>Apellidos:</strong> ${user.last_name}</p>
            <br>
            <p><strong>Correo:</strong> ${user.correo}</p>
            <br>
            <p><strong>Rol:</strong> ${userRole}</p>
        `,
      confirmButtonText: 'Cerrar'
    });
  };


  const filteredUsers = users
    .filter(user => {
      const userRolName = roleNames[user.rol].toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.correo.toLowerCase().includes(searchTerm) ||
        userRolName.includes(searchTerm)
      );
    })
    .filter(user => filterRole === "" || user.rol === Number(filterRole))
    .sort((a, b) => a.first_name.localeCompare(b.first_name));

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen w-full p-4 sm:p-2 lg:p-2">
          <div className="mx-auto mt-8">
            <div className="md:flex md:justify-between md:space-x-8">
              <div className="hidden md:block w-32"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                  <div className="md:ml-4 hidden md:block">
                  <AddUserButton onClick={() => { navigate('/AddUser') }} titulo="Agregar Usuario" />
                  </div>
                  <div className="md:ml-4 hidden md:block">
                    <FilterSelect options={Object.keys(roleNames).map(key => ({ id: key, name: roleNames[Number(key)] }))} onChange={handleFilterChange} />
                  </div>
                </div>
                {Object.keys(roleNames).map(key => {
                  const role = Number(key);
                  const usersByRole = filteredUsers.filter(user => user.rol === role);

                  return (
                    usersByRole.length > 0 && (
                      <div key={role} className="mb-8">
                        <h2 className="text-2xl font-bold capitalize mt-11">{roleNames[role]}</h2>
                        <div className="grid grid-cols-1 gap-4 mt-3">
                          {usersByRole.map(user => (
                            <div key={user.id} className="w-full md:w-auto">
                              <UserCard
                                user={{
                                  id: user.id,
                                  rol: user.rol,
                                  first_name: user.first_name,
                                  last_name: user.last_name,
                                  correo: user.correo,
                                }}
                                onDeleteUser={handleDeleteUser}
                                onViewUser={handleViewUser} // Pasar la función handleViewUser aquí
                                icon={MdAddCircleOutline}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
              <div className="hidden md:block w-32"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsuarios;
