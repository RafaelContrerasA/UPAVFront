import { FC, useEffect, useState } from 'react';
import LogItem from '@/components/logItem/LogItem';
import useFetchLogs from '@/hooks/useFetchLogs';
import { Log } from "@/interfaces/index"
import Loader from '@/components/loaders/Loader';

const App: FC = () => {
  const { logs, isLoading } = useFetchLogs();
  const [logsConNombres, setLogsConNombres] = useState<Log[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 15;

  useEffect(() => {
    setLogsConNombres(logs);
  }, [logs]);


  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logsConNombres.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col mb-2 w-full'>
          <div className='w-[90%]'>
            <div className='flex w-full py-[16px] px-[16px] bg-custom-vino mt-[1rem] rounded-t-[5px]'>
              <p className='font-gibson font-semibold text-white text-[2.5rem] cursor-default'>Registros del sistema</p>
            </div>
            <div className="rounded-b-md w-full overflow-x-hidden overflow-y-auto">
              <div className="w-full">
                {
                  currentLogs.map((log, index) => {
                    return <LogItem key={log.id} log={log} index={index} />
                  })
                }
              </div>
            </div>
            <div className='flex justify-end gap-2 mt-2'>
              <button
                className={` text-white p-2 rounded-[5px] font-gibson font-thin cursor-pointer mb-2 mt-2 ${currentPage === 1 ? "bg-custom-gris" : "bg-custom-vino"} font-gibson font-thin`}
                onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
              <button
                className={`text-white p-2 rounded-[5px] font-gibson font-thin cursor-pointer mb-2 mt-2 ${currentPage === Math.ceil(logsConNombres.length / logsPerPage) ? "bg-custom-gris" : "bg-custom-vino"}`}
                onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(logsConNombres.length / logsPerPage)}>Siguiente</button>
            </div>

          </div>
        </div>
      )}
    </>

  )
}

export default App;
