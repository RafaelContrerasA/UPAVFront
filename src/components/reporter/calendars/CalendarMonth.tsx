import React, { useState } from 'react';

interface CalendarMonthProps {
  onDatesChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ onDatesChange }) => {
  const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue) {
      const [year, month] = inputValue.split('-').map(Number);

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); // El último día del mes

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
      <input type="month" onChange={handleMonthChange} className='w-full h-14 py-2 px-3 text-sm rounded-xl border-2 border-custom-vino' />

    </div>
  );
};

export default CalendarMonth;
