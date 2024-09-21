import React from "react";
import { MdCreate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const cardId = () => {
  return (
    <div className=" w-[700px] h-16 px-5 py-2.5 bg-white justify-between items-center inline-flex drop-shadow-md">
      <div className="justify-start items-center gap-7 flex">
        <div className="w-7 h-12 relative">
            <img src="logo.svg" alt="" />
        </div>
        <div className="text-black text-base font-normal font-['Gibson'] leading-normal">
          Usuario
        </div>
      </div>
      <div className="justify-start items-start gap-6 flex" >
        <MdCreate className='fill-custom-vino  w-6 h-6 hover:fill-custom-guinda'/>
        <MdDeleteOutline className='fill-custom-vino  w-6 h-6 hover:fill-custom-guinda'/>
      </div>
    </div>
  );
};

export default cardId;
