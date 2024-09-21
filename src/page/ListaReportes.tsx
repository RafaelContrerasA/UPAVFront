import CardReportes from '@/components/cardReporte/CardReportes';
import InputBusqueda from '@/components/InputSearch/InputBusqueda';
import BtnFilterMov from '@/components/reporter/BtnFilterMov';
import Filtro from '@/components/reporter/Filtro';


const ListaReportes = () => {

  return (
    <div className=' flex w-full' >
      <div className='block md:hidden w-fit'><BtnFilterMov /></div>
      <div className='hidden md:block bg-custom-vino text-white p-2 w-80 h-full '> <Filtro /></div>
      <div className=' p-3 flex flex-col gap-2 md:w-[700px] w-full'>

        <div className='flex items-center flex-col ml-5'>
          <InputBusqueda />
          <div className=' flex flex-col sm:flex-row w-full justify-between items-center'>
          </div>
          <div className='gap-2 flex flex-col w-full'>
            <CardReportes />
            <CardReportes />
            <CardReportes />

          </div>
        </div>
        

      </div>
    </div>
  )
}

export default ListaReportes