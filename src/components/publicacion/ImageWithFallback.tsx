import React from 'react';
import { AiFillLike } from "react-icons/ai";

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgError, setImgError] = React.useState(false);

  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      {imgError ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6A0F49',  borderRadius: '15%'  }}> 
          <span style={{ color: '#ffffff', width: '100%', height:'100%' }}> <img className='w-[100%] h-[100%] rounded-l-xl' src="https://images3.memedroid.com/images/UPLOADED627/64d407429024f.jpeg" alt="" /></span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={handleImgError} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </div>
  );
};

function App() {
  return (
    <>
      <header className="p-0 m-0 w-[100%] h-[100px] bg-slate-500">
        <h1>Soy el header</h1>
      </header>
      <div className="flex">
        <div className="grid grid-cols-2 gap-4 w-[718px] h-[478px] bg-[#6A0F49] mt-[50px] ml-[300px] rounded-xl">
          <div className="">
            <ImageWithFallback
              className="w-[100%] h-[100%] rounded-l-xl"
              src="https://images3.memedroid.com/images/UPLOADED627/64d407429024f.jpeg"
              alt="CARS"
            />
          </div>
          <div className="items-center text-center">
            <div className="flex h-[30%] w-[80%] mt-2 ml-[10px] p-0">
              <div className="w-[50%] h-[50%]">
                <ImageWithFallback
                  className="w-[100%] mt-2 h-[100%]"
                  src="https://images3.memedroid.com/images/UPLOADED627/64d407429024f.jpeg"
                  alt=""
                />
              </div>
              <div className="mt-1 w-[300px] h-[80px]">
                <div className="mt-2 text-white text-lg">
                  <span className=""> Gobierno de Michoacán</span>
                  <div className="w-[200px] h-[30%]">
                    <h4 className="text-white text-left ml-[5px] mt-[20px] text-sm">
                      07 de marzo del 2024
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white text-center text-sm ml-5 w-[80%] mt-[-25px]">
              CORRAMOS POR EL AGUA este 23 de marzo, en el Zoológico de Morelia.
              ¡Inscribete y vive está gran experiencia!
            </div>
            <div className="text-white text-center text-sm mt-5 ml-5 w-[80%]">
              Inscripciones gratuitas con cupo limitado de 10:00 a 15:00 horas
              Oficinas de la CEAC
            </div>
            <div className="w-[95%] h-[45%]">
              <div className="text-white mt-[100px] flex w-[200px] h-[100px]">
                <div className="block m-auto">
                  <div>30</div>
                  <div>
                    <AiFillLike />
                  </div>
                </div>
                <div className="block m-auto">
                  <div>30</div>
                  <div>
                    <AiFillLike />
                  </div>
                </div>
                <div className="block m-auto">
                  <div>30</div>
                  <div>
                    <AiFillLike />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;