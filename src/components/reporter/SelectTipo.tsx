// SelectTipo.tsx
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import CalendarSemana from "./calendars/CalendarSemana";
import CalendarMonth from "./calendars/CalendarMonth";

interface SelectTipoProps {
  onDatesChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const SelectTipo: React.FC<SelectTipoProps> = ({ onDatesChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-3 rounded-md ">
      <p className=" text-2xl">Rango de Fecha:</p>
      <Select
        label="Eliga el tipo de Reporte"
        className="min-w-44"
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        <SelectItem value="semanal" key={"semanal"}>Semanal</SelectItem>
        <SelectItem value="mensual" key={"mensual"}>Mensual</SelectItem>
      </Select>
      {selectedValue === "semanal" && <CalendarSemana onDatesChange={onDatesChange} />}
      {selectedValue === "mensual" && <CalendarMonth onDatesChange={onDatesChange} />}
    </div>
  );
};

export default SelectTipo;
