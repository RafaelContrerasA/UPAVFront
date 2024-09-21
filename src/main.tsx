import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Login from '@/page/Login'
import Home from '@/page/Home'
import Prueba from '@/page/Prueba'
import Dependencias from './page/Dependencias'
import Logs from './page/Logs'
import Publicaciones from './page/Publicaciones'
import AdminUsuarios from './page/AdminUsuarios'
import AdminDependencias from './page/AdminDependencias'
import AddUserForm from './page/AddUser'
import Reportes from './page/Reportes'
import AddDependencyForm from './page/AddDependency'
import Perfil from './page/Perfil'
import ListaReportes from './page/ListaReportes'
import EditDependency from "./page/EditDependency";
import UserDetails from "./page/UserDetails";
import UserProvider from "./context/UserContext";
import PrivateRoute from "./layout/PrivateRoute";
// import ErrorPage from "./components/errorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Login />,
  },
  {
    children: [
      {
        path: "home",
        element: <PrivateRoute><Home /></PrivateRoute>,
      },
      {
        path: "usuario/:id",
        element: <PrivateRoute><UserDetails /></PrivateRoute>,
      },
      {
        path: "usuario/:id",
        element: <PrivateRoute><UserDetails /></PrivateRoute>,
      },
      {
        path: "dependencias",
        element: <PrivateRoute><Dependencias /></PrivateRoute>,
      },
      {
        path: "addDependency",
        element: <PrivateRoute><AddDependencyForm /></PrivateRoute>,
      },
      {
        path: "reportes",
        element: <PrivateRoute><Reportes /></PrivateRoute>,
      },
      {
        path: "prueba",
        element: <PrivateRoute><Prueba /></PrivateRoute>,
      },
      {
        path: "logs",
        element: <PrivateRoute><Logs /></PrivateRoute>,
      },
      {
        path: "home",
        element: <PrivateRoute><Publicaciones /></PrivateRoute>,
      },
      {
        path: "adminUsuarios",
        element: <PrivateRoute><AdminUsuarios /></PrivateRoute>,
      },
      {
        path: "adminDependencias",
        element: <PrivateRoute><AdminDependencias /></PrivateRoute>,
      },
      {
        path: "addUser",
        element: <PrivateRoute><AddUserForm /></PrivateRoute>,
      },
      {
        path: 'perfil',
        element: <PrivateRoute><Perfil /></PrivateRoute>,
      },
      {
        path: 'reps',
        element: <PrivateRoute><ListaReportes /></PrivateRoute>,
      },
      {
        path: 'editDependencia/:id', 
        element: <PrivateRoute><EditDependency /></PrivateRoute>,
      }
    ]
  }
])


const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <NextUIProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento 'root'");
}
