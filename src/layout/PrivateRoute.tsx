import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarDesk from "@/components/navbar/NavbarDesk";
import NavbarMovile from "@/components/navbar/NavbarMovile";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Leer el estado de la sesión del localStorage
    const sesion = localStorage.getItem('sesion') === 'true';

    if (!sesion) {
      navigate('/');
    }
  }, []);

  if (!(localStorage.getItem('sesion') === 'true')) {
    return null;
  }

  return (
    <div className='w-screen h-screen flex flex-col overflow-x-hidden justify-center items-center font-gibson bg-gray-100'>
      <header className='w-full sticky z-50'>
        <div className="hidden md:block">
          <NavbarDesk />
        </div>
        <div className="block md:hidden">
          <NavbarMovile />
        </div>
      </header>
      <div className=' flex h-full justify-center items-start overflow-y-auto w-full '>
        <div className=' flex h-full justify-center items-start  w-full  max-w-[1440px]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
