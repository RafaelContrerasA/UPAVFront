import React from "react";
import { MdAlternateEmail, MdLock } from "react-icons/md";

import ModalPassword from "@/components/logItem/ModalPassword";
import Loader from "@/components/loaders/Loader";
import useLogin from "@/hooks/useLogin";
import "@/css/login.css"

const Login = () => {
  const {
    email,
    password,
    isLoading,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="login h-[100vh] w-screen overflow-y-hidden overflow-x-hidden flex flex-col items-center justify-center">
      <div className="flex justify-center overflow-hidden items-center mt-4 ml-4 p-2 w-[20rem] h-[15rem] rounded-[3.125rem] bg-white">
        <img src="/logo_sec_tec.svg" alt="logo" className="w-[80%] h-[80%] scale-[125%]" draggable="false" />
      </div>
      <form onSubmit={handleSubmit} className="w-screen h-screen flex flex-col items-center justify-center relative top-12">
        <div className='flex mt-5 md:mt-0'>
          <div className='w-[3rem] h-[3rem] bg-custom-vino flex items-center justify-center rounded-s-[5px]'>
            <MdAlternateEmail className='fill-custom-rosa w-[2rem] h-[2rem]' />
          </div>
          <div>
            <input
              type="email"
              className={`focus:outline-none font-gibson text-[24px] h-[3rem] w-[100%] md:w-[20rem]  rounded-e-[5px] border-custom-vino border-[1px] p-2 truncate shadow-custom1`}
              placeholder='Correo Electrónico'
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="w-[3rem] h-[3rem] bg-custom-vino flex items-center justify-center rounded-s-[5px]">
            <MdLock className="fill-custom-rosa w-[2rem] h-[2rem]" />
          </div>
          <div className="relative">
            <input
              type="password"
              className="h-[3rem] w-[100%] font-gibson text-[24px] md:w-[20rem] rounded-e-[5px] border-custom-vino border-[1px] p-2 focus:outline-none truncate shadow-custom1"
              placeholder="Contraseña"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </div>
        </div>
        <div>
          <button className="w-[19.5rem] md:w-[23rem] h-[3rem] bg-custom-vino mt-4 flex justify-center items-center rounded-[5px] shadow-custom1">
            <p className="uppercase text-white text-center text-[24px] font-medium font-gibson">
              Iniciar sesión
            </p>
          </button>
        </div>

        {isLoading && <Loader/>}
        
        <ModalPassword/>
      </form>
    </div>
  )
}

export default Login;
