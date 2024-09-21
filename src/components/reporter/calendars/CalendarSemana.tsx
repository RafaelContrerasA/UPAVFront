// CalendarSemana.tsx
import React, { useState } from 'react';

interface CalendarSemanaProps {
  onDatesChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const CalendarSemana: React.FC<CalendarSemanaProps> = ({ onDatesChange }) => {
  const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue) {
      const year = parseInt(inputValue.substring(0, 4));
      const week = parseInt(inputValue.substring(6));

      const firstDayOfYear = new Date(year, 0, 1);
      const daysOffset = ((week - 1) * 7) - firstDayOfYear.getDay() + 1;
      const startDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const newDates = { startDate, endDate };
      setDates(newDates);
      onDatesChange(newDates);
    } else {
      const newDates = { startDate: null, endDate: null };
      setDates(newDates);
      onDatesChange(newDates);
    }
  };

  return (
    <div>
      <input type="week" onChange={handleWeekChange} className='w-full h-14 py-2 px-3 text-sm rounded-xl border-2 border-custom-vino' />

    </div>
  );
};

export default CalendarSemana;
