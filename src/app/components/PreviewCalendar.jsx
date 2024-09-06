'use client';

import React, { useMemo } from 'react';
import { useDatePicker } from './DatePickerContext';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { generateRecurrenceDates } from '../utils/recurrenceUtils';

const PreviewCalendar = () => {
  const { startDate, endDate, recurrence } = useDatePicker();

  const datesToHighlight = useMemo(() => {
    if (!startDate || !recurrence) return new Set();
    return generateRecurrenceDates(startDate, recurrence, endDate);
  }, [startDate, endDate, recurrence]);

  const getRecurrencePreview = () => {
    if (!startDate) return 'Please select a start date';

    return `Recurs ${recurrence.frequency} every ${recurrence.interval} ${recurrence.frequency} from ${startDate} to ${endDate || 'indefinitely'}.`;
  };

  // Utility to highlight dates on the calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      date.setDate(date.getDate() + 1)
      const formattedDate = date.toISOString().split('T')[0];

      if (datesToHighlight.has(formattedDate)) {
        return 'highlight-date';
      }
    }
    return null;
  };

  return (
    <div className="border p-4 rounded mt-4">
      <h2 className="text-lg font-semibold">Recurrence Preview:</h2>
      {startDate && recurrence && <p>{getRecurrencePreview()}</p>}
      
      <div className="border p-4 rounded mt-4">
        <div>
          <Calendar
            tileClassName={tileClassName} // Highlight recurring dates
            showNeighboringMonth={ false }
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewCalendar;
