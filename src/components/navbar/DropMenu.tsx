import React, { Fragment, useContext } from "react";
import { MdLogout } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { LuUserCircle2 } from "react-icons/lu";
import { Menu, Transition } from "@headlessui/react";
import { FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLogOut from '@/hooks/useLogOut';
import { UserContext } from "@/context/UserContext";

const DropMenu = () => {
  const logOut = useLogOut();
  const { user } = useContext(UserContext);
  
  return (
    <>
      <Menu>
        <div>
          <Menu.Button>
            <LuUserCircle2 className="h-9 w-9 hover:cursor-pointer outline-none outline-offset-2 outline-2 active:outline-white active:duration-100 ease-out hover:duration-300 rounded-full hover:outline-black stroke-black" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="w-40 font-gibson text-lg transition absolute bg-slate-50 shadow-xl text-black py-0 right-3 top-3 mt-16 rounded-b-lg duration-200 z-50">
            <Menu.Item>
              <Link to={"/perfil"}>
                <button className="flex justify-left items-center border-t gap-2 h-10 text-left px-3 hover:bg-custom-rosa hover:bg-opacity-50 w-full hover:duration-300 active:duration-100 transition-all active:bg-white">
                  <BiUser />
                  Mi Perfil
                </button>
              </Link>
            </Menu.Item>
            {user.rol === 1 ? (
              <Menu.Item>
                <Link to={"/logs"}>
                  <button className="flex justify-left items-center border-t gap-2 h-10 text-left px-3 hover:bg-custom-rosa hover:bg-opacity-50 w-full hover:duration-300 active:duration-100 transition-all active:bg-white">
                    <FaRegNewspaper />
                    Logs
                  </button>
                </Link>
              </Menu.Item>
            ) : null}
            <Menu.Item>
              <Link to={"/"}>
                <button 
                  onClick={ () => logOut() }
                  className="flex justify-left items-center border-t gap-2 h-10 text-left px-3 hover:bg-custom-rosa hover:bg-opacity-50 w-full hover:duration-300 active:duration-100 transition-all active:bg-white">
                  <MdLogout />
                  Cerrar Sesion
                </button>
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default DropMenu;
