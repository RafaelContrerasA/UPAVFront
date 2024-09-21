import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useLogOut from "@/hooks/useLogOut";
import { User } from "@/interfaces/index";

const roleNames: { [key: number]: string } = {
  1: "Superusuario",
  2: "Revisor",
  3: "Invitado",
};

const useAdminUsuarios = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const logOut = useLogOut();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const handleDeleteUser = async (userId: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'No, cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('access_token');
        if (!token) {
          mostrarModalSesionExpirada();
          return;
        }

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      console.log("Usuario eliminado con ID:", userId);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
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
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        mostrarModalSesionExpirada();
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/usuario/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
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

    fetchUsers();
  }, []);

  return {
    users,
    searchTerm,
    selectedUser,
    isModalOpen,
    handleViewUser,
    handleCloseModal,
    handleSearchChange,
    handleDeleteUser,
    roleNames
  };
};

export default useAdminUsuarios;
