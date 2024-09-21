import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import useLogOut from "./useLogOut";
import { useNavigate } from "react-router-dom";

interface Pub {
  id: string;
  link: string;
  time: string;
  text: string;
  id_dependencia: number;
  me_gusta: number;
  me_encanta: number;
  me_divierte: number;
  me_asombra: number;
  me_entristece: number;
  me_enoja: number;
  me_importa: number;
  comentarios: number;
  compartidas: number;
  url: string;
  reacciones: number;
}

interface Image {
  id: number;
  url: string;
  extracted_text: string;
  id_publicacion: number;
}

interface Dependency {
  id: number;
  tipo: number;
  nombre: string;
}

interface AllReactions {
  me_gusta: number;
  me_encanta: number;
  me_divierte: number;
  me_asombra: number;
  me_entristece: number;
  me_enoja: number;
  me_importa: number;
  total: number;
}

const useFetchPublicacionesYImagenes = (
  searchPub: string,
  dates: { startDate: Date | null; endDate: Date | null },
  selectedDependency: Dependency | null,
  filteredDependencias: Dependency[],
  selectedSection: number,
  order: string
) => {
  const [publicaciones, setPublicaciones] = useState<Pub[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const logOut = useLogOut();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        mostrarModalSesionExpirada();
        return;
      }

      try {
        const [publicacionesResponse, imagenesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_URL}/publicacion/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_URL}/image/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const publicacionesData = publicacionesResponse.data;
        const imagenesData = imagenesResponse.data;

        // Crear un objeto Map para almacenar las imágenes por id_publicacion
        const imageMap = new Map();
        imagenesData.forEach((img: Image) => {
          imageMap.set(img.id_publicacion, img.url);
        });

        // Actualizar el arreglo de publicaciones con las URLs de las imágenes
        const publicacionesActualizadas = publicacionesData.map(
          (publicacion: Pub) => {
            const urlImagen = imageMap.get(publicacion.id);
            return {
              ...publicacion,
              text: `${publicacion.text} ${publicacion.text}`, // Duplicar la propiedad 'text' para el filtrado
              url: urlImagen || "", // Si no hay URL de imagen, asigna una cadena vacía
              reacciones:
                publicacion.me_asombra +
                publicacion.me_divierte +
                publicacion.me_encanta +
                publicacion.me_enoja +
                publicacion.me_entristece +
                publicacion.me_gusta +
                publicacion.me_importa,
            };
          }
        );

        setPublicaciones(publicacionesActualizadas);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
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
              popup: "custom-swal-small",
            },
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchPub]); // Dependencias añadidas

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

  const filteredPublicaciones = useMemo(() => {
    const filteredAndSortedPublicaciones = publicaciones
      .filter((publicacion) => {
        // Si selectedDependency está vacío o nulo, no filtrar por dependencia
        if (
          selectedDependency &&
          publicacion.id_dependencia !== selectedDependency.id
        ) {
          return false;
        }

        const publicacionDate = new Date(publicacion.time);
        if (
          dates.startDate &&
          dates.endDate &&
          (publicacionDate < dates.startDate || publicacionDate > dates.endDate)
        ) {
          return false;
        }

        const palabras = publicacion.text.toLowerCase().split(" ");
        const palabrasClave = searchPub.toLowerCase().split(" ");

        return palabrasClave.every((palabraClave) =>
          palabras.some((palabra) => palabra.includes(palabraClave))
        );
      })
      .sort((a, b) => {
        switch (order) {
          case "descReac":
            return b.reacciones - a.reacciones;
          case "ascReac":
            return a.reacciones - b.reacciones;
          case "Reci":
            return new Date(b.time).getTime() - new Date(a.time).getTime();
          case "Ant":
            return new Date(a.time).getTime() - new Date(b.time).getTime();
          default:
            return 0; // Valor por defecto en caso de un 'order' no reconocido
        }
      })

    return filteredAndSortedPublicaciones;
  }, [publicaciones, searchPub, selectedDependency, dates, order]);

  const publicacionImportante = useMemo(
    () => filteredPublicaciones[0],
    [filteredPublicaciones]
  );

  const totalReacciones = useMemo(() => {
    return filteredPublicaciones.reduce(
      (acc, publicacion) => {
        acc.me_gusta += publicacion.me_gusta;
        acc.me_encanta += publicacion.me_encanta;
        acc.me_divierte += publicacion.me_divierte;
        acc.me_asombra += publicacion.me_asombra;
        acc.me_entristece += publicacion.me_entristece;
        acc.me_enoja += publicacion.me_enoja;
        acc.me_importa += publicacion.me_importa;
        acc.total += publicacion.reacciones;
        return acc;
      },
      {
        me_gusta: 0,
        me_encanta: 0,
        me_divierte: 0,
        me_asombra: 0,
        me_entristece: 0,
        me_enoja: 0,
        me_importa: 0,
        total: 0,
      } as AllReactions
    );
  }, [filteredPublicaciones]);

  return {
    publicaciones: filteredPublicaciones,
    totalReacciones,
    error,
    isLoading,
    filteredDependencias,
    publicacionImportante,
  };
};

export default useFetchPublicacionesYImagenes;
