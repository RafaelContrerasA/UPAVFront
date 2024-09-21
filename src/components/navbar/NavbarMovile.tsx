import React, { useContext, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import ButtonNavMov from './ButtonNavMov';
import DropMenu from './DropMenu';
import { MdGroups, MdDescription, MdAccountBalance } from "react-icons/md";
import { UserContext } from '@/context/UserContext';

const NavbarMovile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <div className='bg-custom-vino flex w-full h-20 z-50 relative items-center'>
        <img
          src="images/Navbar/Vector5.png"
          className="absolute z-0 h-full right-0"
        />
        <div className='flex justify-between py-3 w-full z-50'>
          <div className='flex justify-center items-center w-16 h-16'>
            <button onClick={() => setShowSidebar(!showSidebar)}>
              <GiHamburgerMenu className='fill-white w-6 h-6' />
            </button>
          </div>
          <div className='justify-center items-center flex'>
            <img src="/images/Logo.svg" alt="" className='h-14' />
          </div>
          <div className='flex justify-center items-center w-16 h-16 z-50'>
            <DropMenu />
          </div>
        </div>
      </div>
      <div className={`bg-custom-vino font-gibson w-full text-lg z-40 flex flex-col ease-in-out text-white fixed h-full duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"} ${showSidebar ? "opacity-100" : "opacity-0"}`}>
        {user.rol === 1 ? (
          <ButtonNavMov link='/adminUsuarios' name='Usuarios' onClick={() => setShowSidebar(!showSidebar)}>
            <MdGroups />
          </ButtonNavMov>
        ) : null}
        {user.rol !== 3 ? (
          <ButtonNavMov link='/reportes' name='Reportes' onClick={() => setShowSidebar(!showSidebar)}>
            <MdDescription />
          </ButtonNavMov>
        ) : null}
        <ButtonNavMov link='/adminDependencias' name='Dependencias' onClick={() => setShowSidebar(!showSidebar)}>
          <MdAccountBalance />
        </ButtonNavMov>
      </div>
    </>
  )
}

export default NavbarMovile
