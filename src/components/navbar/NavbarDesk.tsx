import DropMenu from './DropMenu';
import ButtonNav from "./ButtonNav";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const NavbarDesk: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="font-gibson nav h-20 w-full text-white relative bg-custom-vino">
      <img
        src="images/Navbar/Vector5.png"
        className="absolute z-0 h-full right-0"
      />
      <div className="h-full w-full flex flex-row justify-between px-7 z-30 absolute">
        <Link to={'/home'}>
          <img src="images/Logo.svg" className="h-full w-auto p-3 hover:cursor-pointer" />
        </Link>
        <div className="h-full flex flex-row gap-8">
          <div className="flex flex-row items-center justify-center gap-1">
            {user.rol === 1 ? (<ButtonNav name="Usuarios" link="/adminUsuarios" />) : null}
            {user.rol !== 3 ? (<ButtonNav name="Reportes" link="/reportes" />) : null}
            <ButtonNav name="Dependencias" link="/adminDependencias" />
          </div>
          <div className="h-full w-auto justify-center items-center flex relative z-50">
            <DropMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesk;
