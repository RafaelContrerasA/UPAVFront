import { Outlet } from "react-router-dom"
import NavbarDesk from "@/components/navbar/NavbarDesk"
import NavbarMovile from "@/components/navbar/NavbarMovile"
const Layout = () => {
  return (
    <div className='w-screen h-screen overflow-x-hidden overflow-y-scroll font-gibson'>
      <header className='w-full'>
      <div className=" hidden md:block">
        <NavbarDesk/>
      </div>
      <div className=" block md:hidden">
        <NavbarMovile/>
      </div>
      </header>
      <Outlet />
    </div>
  )
}

export default Layout