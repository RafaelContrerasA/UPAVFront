import { useEffect, useState, ChangeEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { SliderValue } from "@nextui-org/slider";
import useFetchPublicacionesYImagenes from "@/hooks/useFetchPublicacionesYImagenes";
import useLogOut from "@/hooks/useLogOut";
import { Dependencia } from "@/interfaces";
import React from "react";
import useFetchDependencias from "./useFetchDependencias";

interface Reporte {
  id: string;
  nombre: string;
  pertenecea: number;
  tipo_reporte: string;
  fecha: string;
  total_reacciones: number;
  total_comentarios: number;
  total_compartidos: number;
  total_publicaciones: number;
  gusta: number;
  encanta: number;
  importa: number;
  divierte: number;
  asombra: number;
  entristece: number;
  enoja: number;

  total_reacciones_popular: number;
  total_comentarios_popular: number;
  total_compartidos_popular: number;

  gusta_popular: number;
  encanta_popular: number;
  importa_popular: number;
  divierte_popular: number;
  asombra_popular: number;
  entristece_popular: number;
  enoja_popular: number;

  chartImageGeneral?: string;
  chartImageReacciones?: string;

  chartImagePopular?: string;
  chartImagePopularReacciones?: string;

  chartImageSemanas?: string;
}

const usePublicaciones = () => {
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

  const {
    publicaciones,
    error,
    isLoading,
    totalReacciones,
    publicacionImportante,
  } = useFetchPublicacionesYImagenes(
    searchPub,
    dates,
    selectedDependency,
    filteredDependencias,
    selectedSection,
    order
  );
  const defaultReporte: Reporte = {
    id: '0',
    nombre: 'default',
    pertenecea: 0,
    tipo_reporte: 'default',
    fecha: '',
    total_reacciones: 0,
    total_comentarios: 0,
    total_compartidos: 0,
    total_publicaciones: 0,
    gusta: 0,
    encanta: 0,
    importa: 0,
    divierte: 0,
    asombra: 0,
    entristece: 0,
    enoja: 0,
    total_reacciones_popular: 0,
    total_comentarios_popular: 0,
    total_compartidos_popular: 0,
    gusta_popular: 0,
    encanta_popular: 0,
    importa_popular: 0,
    divierte_popular: 0,
    asombra_popular: 0,
    entristece_popular: 0,
    enoja_popular: 0,
    chartImageGeneral: undefined,
    chartImageReacciones: undefined,
    chartImagePopular: undefined,
    chartImagePopularReacciones: undefined,
    chartImageSemanas: undefined,
  };
  

  const ReporteFinal: Reporte = useMemo(() => {
    if (
      !totalReacciones ||
      !publicacionImportante ||
      !publicaciones ||
      !dates.startDate ||
      !dates.endDate ||
      !selectedDependency
    ) {
      return defaultReporte;
    }
  
    return {
      id: "1",
      nombre: selectedDependency.nombre,
      pertenecea: selectedDependency.id,
      tipo_reporte: "tipo", // Assign an appropriate value
      fecha: `${dates.startDate.toString()} - ${dates.endDate.toString()}`,
      total_reacciones: totalReacciones.total,
      total_comentarios: 0, // Assign an appropriate value
      total_compartidos: 0, // Assign an appropriate value
      total_publicaciones: publicaciones.length,
      gusta: totalReacciones.me_gusta,
      encanta: totalReacciones.me_encanta,
      importa: totalReacciones.me_importa,
      divierte: totalReacciones.me_divierte,
      asombra: totalReacciones.me_asombra,
      entristece: totalReacciones.me_entristece,
      enoja: totalReacciones.me_enoja,
      total_reacciones_popular: publicacionImportante.reacciones,
      total_comentarios_popular: 0, // Assign an appropriate value
      total_compartidos_popular: 0, // Assign an appropriate value
      gusta_popular: publicacionImportante.me_gusta,
      encanta_popular: publicacionImportante.me_encanta,
      importa_popular: publicacionImportante.me_importa,
      divierte_popular: publicacionImportante.me_divierte,
      asombra_popular: publicacionImportante.me_asombra,
      entristece_popular: publicacionImportante.me_entristece,
      enoja_popular: publicacionImportante.me_enoja,
      chartImageGeneral: undefined, // Optional
      chartImageReacciones: undefined, // Optional
      chartImagePopular: undefined, // Optional
      chartImagePopularReacciones: undefined, // Optional
      chartImageSemanas: undefined, // Optional
    };
  }, [
    totalReacciones,
    publicaciones,
    publicacionImportante,
    dates,
    selectedDependency,
    
  ]);
  
  console.log(ReporteFinal);

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
    publicaciones,
    error,
    isLoading,
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
    totalReacciones,
    setOrder,
    ReporteFinal
  };
};

export default usePublicaciones;
