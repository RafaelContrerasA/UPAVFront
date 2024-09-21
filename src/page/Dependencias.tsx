import React, { useEffect, useState } from 'react'
import ButtonComponent from '@/components/ButtonComponent'
import { MdAddCircleOutline } from 'react-icons/md'
import InputBusqueda from '@/components/InputSearch/InputBusqueda'
import CardDep from '@/components/cards/CardDep'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Dependencia {
  id: string;
  nombre: string;
  pagina_fb: string;
  pertenecea: number;
  tipo: number;
  status: string;
  siglas: string
  // Agrega aquí las propiedades de tu dependencia
}

const Dependencias = () => {

  const navigate = useNavigate();
  const [allDep, setAllDep] = useState<Dependencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/dependencia/`);

        console.log(response.data);
        setAllDep(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  return (
    <div className=' flex justify-center items-center w-full' >
      <div className=' p-3 flex flex-col gap-2 md:w-[700px] w-full'>

        <InputBusqueda />
        <div className=' flex flex-col sm:flex-row w-full justify-between items-center'>
          <h1 className=' text-2xl sm:text-3xl'>
            Dependencias
          </h1>
          <ButtonComponent label='Nueva Dependencia ' key='new-dependency-button' onClick={() =>{ navigate('/AddDependency')}} >
            <MdAddCircleOutline className=' w-7 h-7' />
          </ButtonComponent>
        </div>
        {loading && <p>Cargando dependencias...</p>}
        {error && <p>{error}</p>}
        {allDep.length > 0 && (
          <div className=' flex gap-2 flex-col'>
            {allDep.map((dep) => (
              <CardDep key={dep.id} dependencia={dep}  />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dependencias