import React from "react";
import { DatePicker } from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  DateValue,
  CalendarDate,
  isSameDay,
} from "@internationalized/date";

export default function CalendarYear() {
  // Define la fecha del primer día del año actual
  const firstDayOfYear = new CalendarDate(today(getLocalTimeZone()).year, 1, 1);

  // Función para verificar si una fecha está disponible
  const isDateUnavailable = (date: DateValue) => {
    // Bloquea todos los días excepto el primer día del año
    return !isSameDay(date, firstDayOfYear);
  };

  return (
    <DatePicker
      className="min-w-40"
      label="Fecha de la cita"
      aria-label="Fecha de la cita"
      isDateUnavailable={isDateUnavailable}
      maxValue={today(getLocalTimeZone())}
    />
  );
}
