import React from "react";
import { Slider } from "@nextui-org/react";

export default function SliderPub({value, setValue}) {
 
  return (
    <div className=" bg-white py-2 px-3 min-w-14 text-tiny  rounded-medium h-14 w-full">
      <Slider
        label="Cantidad de Publicaciones"
        size="sm"
        showTooltip={true}
        step={5}
        defaultValue={10}
        onChangeEnd={setValue}
        maxValue={60}
        getValue={(donuts) => `${donuts}`}
        className=" w-full text-tiny"
      />
    </div>
  );
}
