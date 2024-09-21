// src/pages/AdminDependencias.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/User/UserCard";
import SearchInput from "../components/InputSearch/InputSearch";
import AddUserButton from "../components/Button/AddUserButton";
import { CgProfile } from "react-icons/cg";
import LOGOMICH from "../components/User/LOGOMICH.png";
import FilterSelect from "../components/Filter/Filter";
import Loader from "@/components/loaders/Loader";
import useAdminDependencias from "@/hooks/useAdminDependencias";

const AdminDependencias = () => {
  const navigate = useNavigate();
  const {
    dependencias,
    searchTerm,
    filterType,
    isLoading,
    handleSearchChange,
    setFilterType,
    handleDeleteDependency,
    handleEditDependencia,
    tipoNames
  } = useAdminDependencias();

  
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen  p-4 sm:p-2 lg:p-2 w-full">
          <div className="mx-auto mt-8">
            <div className="md:flex md:justify-between md:space-x-8">
              <div className="hidden md:block w-32"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <SearchInput searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                  <div className="md:ml-4 hidden md:block">
                    <AddUserButton onClick={() => { navigate('/AddDependency') }} titulo="Agregar Dependencia" />
                  </div>
                  <div className="md:ml-4 hidden md:block">
                    <FilterSelect options={tipoNames} onChange={setFilterType} />
                  </div>
                </div>
                {tipoNames.map((tipo) => {
                  const filteredDependencias = dependencias
                    .filter((dependencia) => filterType === "" || dependencia.tipo === Number(filterType))
                    .filter((dependencia) => dependencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter((dependencia) => dependencia.tipo === tipo.id)
                    .sort((a, b) => a.nombre.localeCompare(b.nombre));

                  return (
                    filteredDependencias.length > 0 && (
                      <div key={tipo.id} className="mb-8">
                        <h2 className="text-2xl font-bold capitalize mt-11">{tipo.name}</h2>
                        <div className="grid grid-cols-1 gap-4 mt-3">
                          {filteredDependencias.map((dependencia) => (
                            <div key={dependencia.id} className="w-full md:w-auto">
                              <UserCard
                                user={{
                                  id: dependencia.id,
                                  rol: 0,
                                  nombre: dependencia.nombre,
                                  apellido_paterno: "",
                                  apellido_materno: "",
                                  correo: "",
                                  url_facebook: dependencia.url_facebook,
                                  pertenecea: dependencia.pertenecea,
                                  tipo: dependencia.tipo,
                                  status: dependencia.status,
                                  siglas: dependencia.siglas,
                                }}
                                onDeleteUser={handleDeleteDependency}
                                onEdit={handleEditDependencia}
                                icon={CgProfile}
                                photoUrl={LOGOMICH}
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

export default AdminDependencias;
