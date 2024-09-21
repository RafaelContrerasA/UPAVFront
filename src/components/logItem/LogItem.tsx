import { FC } from 'react';

interface Log {
  id: number;
  idUsuario: number;
  nombreUsuario?: string; 
  accion: string;
  fecha: string;
}

interface LogItemProps {
  log: Log;
  index: number;
}

const LogItem: FC<LogItemProps> = ({ log, index }) => {
  const backgroundColor = index % 2 === 0 ? 'bg-gray-300' : 'bg-white';

  // Crear un objeto Date a partir de la fecha en formato ISO
  const date = new Date(log.fecha);

  // Formatear la fecha a "dia/mes/año - hora"
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className={`${backgroundColor} p-2 sm:grid sm:grid-cols-2 sm:gap-4`}>
      <p className="border-gray-200 font-gibson cursor-default"><span className='opacity-100 text-[14px] md:opacity-0 md:text-[0px] font-bold truncate'>Acción: </span>{log.accion}</p>
      <p className="border-gray-200 font-gibson cursor-default"><span className='opacity-100 text-[14px] md:opacity-0 md:text-[0px] font-bold truncate'>Fecha: </span>{formattedDate}</p>
    </div>
  );
};

export default LogItem;
