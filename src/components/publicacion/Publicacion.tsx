import React from "react";
import { FaFacebook } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Publicacion {
  id: string;
  link: string;
  time: string;
  text: string;
  id_dependencia: number;
  me_gusta: number;
  me_encanta: number;
  me_divierte: number;
  me_asombra: number;
  me_entristece: number;
  me_enoja: number;
  me_importa: number;
  comentarios: number;
  compartidas: number;
  url: string;
  reacciones: number;
}
interface PublicacionProps {
  publicacion: Publicacion;
}
const Publicacion: React.FC<PublicacionProps> = ({ publicacion }) => {
  return (
    <div className=" bg-white p-1 flex w-full  flex-col rounded-md  ">


      <div className="  w-full text-custom-vino">
        <div className=" flex h-full flex-col p-4 justify-between">

          <div>

            <div className=" flex gap-2 justify-start items-center">
              <div className=" bg-white justify-center items-center flex aspect-square h-14 rounded-full">
                <FaFacebook className="fill-custom-vino h-12 w-12" />
              </div>
              <div className=" flex flex-col truncate">

                <p className=" text-lg truncate font-semibold">{publicacion.text}</p>
                <p className=" text-sm">
                  {new Date(publicacion.time).toLocaleString(
                    "es-ES",
                    { day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }
                  )}
                </p>

              </div>
            </div>
            <div className=" line-clamp-5 leading-tight text-sm">{publicacion.text}</div>
          </div>
          <div className="flex w-full justify-between">
            <div className=" flex gap-1">
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_gusta.svg' alt="" className="w-5 h-5" />
                {publicacion.me_gusta}
              </div>
              <div className=" flex flex-col justify-center items-center">
                
                <img src='/icons/me_encanta.svg' alt="" className="w-5 h-5" />
                {publicacion.me_encanta}
              </div>
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_divierte.svg' alt="" className="w-5 h-5" />
                
                {publicacion.me_divierte}
              </div>
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_asombra.svg' alt="" className="w-5 h-5" />
                {publicacion.me_asombra}
              </div>
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_entristece.svg' alt="" className="w-5 h-5" />
                {publicacion.me_entristece}
              </div>
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_enoja.svg' alt="" className="w-5 h-5" />
                {publicacion.me_enoja}
              </div>
              <div className=" flex flex-col justify-center items-center">
              <img src='/icons/me_importa.svg' alt="" className="w-5 h-5" />
                {publicacion.me_importa}
              </div>
            </div>
            <div>
              <p>Total de Reacciones</p>
              <p>{publicacion.reacciones}</p>
            </div>

          </div>
          <a href={publicacion.link}>Ver Nota Completa</a>
        </div>
      </div>
      <div className=" w-full items-start flex justify-center ">

        <LazyLoadImage


          alt={publicacion.url}
          effect="blur"
          src={publicacion.url}
          className=" max-h-96 object-cover" />
      </div>
    </div>
  );
};

export default Publicacion;
