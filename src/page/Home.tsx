import React from "react";
import SelectTipo from "@/components/reporter/SelectTipo";
import SearchInputPub from "@/components/InputSearch/InputSearchPub";
import Publicacion from "@/components/publicacion/Publicacion";
import Loader from "@/components/loaders/Loader";
import GraficaFiltro from "@/components/publicacion/GraficaFiltro";

import usePublicaciones from "@/hooks/usePublicaciones";
import SelectDependency from '../components/publicacion/filterBar/SelectDependency';
import SelectOrderBy from "@/components/publicacion/SelectOrderBy";
import CardReportes from '@/components/cardReporte/CardReportes';

const Reportes = () => {
  const {
    groupSelected,
    publicaciones,
    error,
    isLoading,
    handleSearchChange,
    selectedSection,
    filteredDependencias,
    selectedDependency,
    handleDependencyChange,
    handleSectionChange,
    searchPub,
    setDates,
    totalReacciones,
    setOrder,
    ReporteFinal
  } = usePublicaciones();


  return (
    <div className="w-full  h-full items-start relative   flex flex-col">
      {/* <SearchInputPub onSearchChange={handleSearchChange} /> */}
      <div className="flex justify-center max-w-[1440px] w-full  flex-col mt-2">
        <div className=" w-full   px-4 pt-5 flex flex-col gap-4 items-center justify-center   ">
          <div className=" w-2/3">
            <SearchInputPub onSearchChange={handleSearchChange} />
          </div>
          
        </div>
        <h1 className=" text-3xl font-semibold m-2">
            Resultados de búsqueda para: {searchPub}
          </h1>
      </div>
      <div className=" flex flex-row justify-center h-full w-full   relative overflow-y-auto  ">
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

        <div className=" flex flex-col w-full lg:w-3/4 max-w-[1080px]  items-center   h-full">
      
          
          <div className=" w-full flex flex-row h-full justify-between   relative   ">
            <div className="relative grid grid-cols-1 gap-1 w-1/2 p-2  items-start bg-w  h-full overflow-y-auto ">
              {isLoading ? (
                <div className="w-full h-96 justify-center items-center flex">
                  <Loader />
                </div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                publicaciones.length > 0 &&
                publicaciones
                  .filter(
                    (publicacion) =>
                      groupSelected.length === 0 || groupSelected.includes(publicacion.id_dependencia)
                  )
                  
                  .map((publicacion) => (
                    <div key={publicacion.id} className="w-full">
                      <Publicacion publicacion={publicacion} />
                    </div>
                  ))
              )}
            </div>
            <div className="  top-0 right-0 h-full overflow-y-auto p-5  ">
              <GraficaFiltro totalReacciones={totalReacciones} />
              
            </div>

          </div>
        </div>




      </div>
    </div>
  );
};

export default Reportes;
