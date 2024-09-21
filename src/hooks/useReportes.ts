import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { SliderValue } from "@nextui-org/slider";
import useLogOut from "@/hooks/useLogOut";
import { Dependencia } from "@/interfaces";
import React from "react";
import useFetchDependencias from "./useFetchDependencias";


const useReportes = () => {
  const [order, setOrder] = useState<string>("desc");
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [searchPub, setSearchPub] = useState<string>("");
  const [searchDep, setSearchDep] = useState<string>("");
  const [value, setValue] = useState<SliderValue>(10);
  const [groupSelected, setGroupSelected] = React.useState<number[]>([]);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const logOut = useLogOut();
  const navigate = useNavigate();

  const {
    selectedSection,
    handleSectionChange,
    filteredDependencias,
    selectedDependency,
    handleDependencyChange,
  } = useFetchDependencias();


 
  

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      mostrarModalSesionExpirada();
      return;
    }

    const fetchDependencias = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/dependencia/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDependencias(response.data);
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

    fetchDependencias();
  }, []);

  const mostrarModalSesionExpirada = () => {
    Swal.fire({
      title: "Sesión expirada",
      text: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
      icon: "warning",
      confirmButtonText: "Iniciar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate("/");
      }
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchPub(searchTerm);
  };

  const handleSearchChangeDep = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchDep(event.target.value);
  };

  return {
    dependencias,
    searchPub,
    searchDep,
    value,
    groupSelected,
    handleSearchChange,
    handleSearchChangeDep,
    setValue,
    setGroupSelected,
    selectedSection,
    handleSectionChange,
    filteredDependencias,
    selectedDependency,
    handleDependencyChange,
    setDates,
    setOrder,
  };
};

export default useReportes;
