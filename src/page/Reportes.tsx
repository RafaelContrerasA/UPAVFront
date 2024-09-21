import { useState, useEffect } from 'react';
import BtnFilterMov from '@/components/reporter/BtnFilterMov';
import Filtro from '@/components/reporter/Filtro';
import CardReportes from '@/components/cardReporte/CardReportes';

import Loader from '@/components/loaders/Loader';

import SelectOrderBy from '@/components/publicacion/SelectOrderBy';
import SelectDependency from '@/components/publicacion/filterBar/SelectDependency';
import SelectTipo from '@/components/reporter/SelectTipo';

import useReportes from '@/hooks/useReportes';


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

  nombre_popular: string;
  total_reacciones_popular: number;
  total_comentarios_popular: number;
  total_compartidos_popular: number;

  gusta_popular?: number;
  encanta_popular?: number;
  importa_popular?: number;
  divierte_popular?: number;
  asombra_popular?: number;
  entristece_popular?: number;
  enoja_popular?: number;

  publicaciones_por_semana?: PublicacionesPorSemana;
}


interface PublicacionesPorSemana {
  [semana: string]: number;
}

const ListaReportes = () => {
  const [reporte, setReporte] = useState<Reporte[]>([]);

  const [isLoading, setIsLoading] = useState(true)

  const { setOrder, selectedSection, handleSectionChange, filteredDependencias, selectedDependency, handleDependencyChange, setDates } = useReportes()


  useEffect(() => {
    setIsLoading(true)
    const reporteData: Reporte[] = [
      {
        id: '1',
        nombre: 'Alfredo Ramírez Bedolla',
        pertenecea: 1,
        tipo_reporte: 'Semanal',
        fecha: '21/04/2024 - 27/04/2024',
        total_reacciones: 0,
        total_comentarios: 50,
        total_compartidos: 20,
        total_publicaciones: 50,
        gusta: 15,
        encanta: 15,
        importa: 20,
        divierte: 20,
        asombra: 30,
        entristece: 22,
        enoja: 18,

        nombre_popular: 'Juntos por el Agua',
        total_reacciones_popular: 10,
        total_comentarios_popular: 2,
        total_compartidos_popular: 1,

        gusta_popular: 5,
        encanta_popular: 3,
        importa_popular: 1,
        divierte_popular: 2,
        asombra_popular: 3,
        entristece_popular: 1,
        enoja_popular: 1,

      },
      {
        id: '3',
        nombre: 'Coordinación de Planeación para el Desarrollo del Estado de Michoacán de Ocampo',
        pertenecea: 4,
        tipo_reporte: 'Mensual',
        fecha: '01/04/2024 - 30/04/2024',
        total_reacciones: 0,
        total_comentarios: 10,
        total_compartidos: 5,
        total_publicaciones: 25,
        gusta: 18,
        encanta: 5,
        importa: 2,
        divierte: 18,
        asombra: 15,
        entristece: 20,
        enoja: 15,
        publicaciones_por_semana: {
          'Semana 1': 10,
          'Semana 2': 15,
          'Semana 3': 8,
          'Semana 4': 17,
          'Semana 5': 17,
        },

        nombre_popular: 'Juntos por el Agua',
        total_reacciones_popular: 0,
        total_comentarios_popular: 2,
        total_compartidos_popular: 1,

        gusta_popular: 2,
        encanta_popular: 5,
        importa_popular: 2,
        divierte_popular: 18,
        asombra_popular: 15,
        entristece_popular: 20,
        enoja_popular: 15,

      },
      {
        id: '4',
        nombre: 'Secretaría de Contraloría ',
        pertenecea: 3,
        tipo_reporte: 'Diario',
        fecha: '27/04/2024',
        total_reacciones: 0,
        total_comentarios: 100,
        total_compartidos: 20,
        total_publicaciones: 150,
        gusta: 158,
        encanta: 150,
        importa: 200,
        divierte: 11,
        asombra: 10,
        entristece: 22,
        enoja: 10,

        nombre_popular: 'Nueva carretera Ixtapa - Morelia',
        total_reacciones_popular: 100,
        total_comentarios_popular: 5,
        total_compartidos_popular: 10,
        gusta_popular: 50,
        encanta_popular: 30,
        importa_popular: 10,
        divierte_popular: 20,
        asombra_popular: 30,
        entristece_popular: 10,
        enoja_popular: 20,

      },
      {
        id: '8',
        nombre: 'Secretaría de Comunicaciones y Obras Públicas ',
        pertenecea: 2,
        tipo_reporte: 'Mensual',
        fecha: '01/11/2024 - 30/11/2024',
        total_reacciones: 0,
        total_comentarios: 10,
        total_compartidos: 40,
        total_publicaciones: 10,
        gusta: 11,
        encanta: 11,
        importa: 60,
        divierte: 80,
        asombra: 60,
        entristece: 12,
        enoja: 11,
        publicaciones_por_semana: {
          'Semana 1': 5,
          'Semana 2': 10,
          'Semana 3': 5,
          'Semana 4': 5,
        },

        nombre_popular: 'Feria de Origen',
        total_reacciones_popular: 30,
        total_comentarios_popular: 4,
        total_compartidos_popular: 2,

        gusta_popular: 2,
        encanta_popular: 5,
        importa_popular: 2,
        divierte_popular: 18,
        asombra_popular: 15,
        entristece_popular: 20,
        enoja_popular: 15,

      },
    ];
    // Establecer los datos de prueba en el estado
    setReporte(reporteData);
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, []);

  return (

    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className='flex w-full h-full'>
          {/* Filtros y búsqueda */}
          <div className=" w-0 lg:w-1/4 max-w-[360px] p-5 flex flex-col gap-3 overflow-y-auto  ">
        <SelectOrderBy onOrderChange={setOrder} />

        <SelectDependency
          value={selectedSection}
          handleSectionChange={handleSectionChange}
          dependencias={filteredDependencias}
          selectedDependency={selectedDependency}
          handleDependencyChange={handleDependencyChange}
        />
        <SelectTipo onDatesChange={setDates} />
      </div>
          <div className='p-3 flex flex-col gap-2 w-full'>
            {/* Iterar sobre los reportes y renderizar el componente CardReportes para cada uno */}
            {reporte.map((report, index) => (
              <CardReportes key={index} reporte={report} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListaReportes;
