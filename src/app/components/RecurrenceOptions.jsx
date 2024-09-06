'use client';

import React, { useState } from 'react';
import { useDatePicker } from './DatePickerContext';

const RecurrenceOptions = () => {
  const { recurrence, setRecurrence } = useDatePicker();
  const [error, setError] = useState(false);

  const handleFrequencyChange = (e) => {
    setRecurrence((prev) => ({
      ...prev,
      frequency: e.target.value,
    }));
  };

  const handleIntervalChange = (e) => {
    const value = e.target.value;
    
    if (value < 1) {
      setError(true);
    } else {
      setError(false);
      setRecurrence((prev) => ({
        ...prev,
        interval: parseInt(value, 10),
      }));
    }
  };

  const getDays = () => {
    if (recurrence.frequency === "daily")
      return recurrence.interval === 1 ? "day" : "days";
    else if (recurrence.frequency === "weekly")
      return recurrence.interval === 1 ? "week" : "weeks";
    else if (recurrence.frequency === "monthly")
      return recurrence.interval === 1 ? "month" : "months";
    else
      return recurrence.interval === 1 ? "year" : "years";
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="frequency">Recurrence Frequency:</label>
        <select
          id="frequency"
          value={recurrence.frequency}
          onChange={handleFrequencyChange}
          className="border p-2 rounded w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label htmlFor="interval">Recurrence Every:</label>
        <div className="flex flex-row">
          <input
            id="interval"
            type="number"
            min="1"
            value={recurrence.interval}
            onChange={handleIntervalChange}
            className="border p-2 rounded w-full"
          />
          <span className='flex flex-row items-center ml-2'>{getDays()}</span>
        </div>
        {error && <span className="text-red-500 text-sm">Value must be 1 or above</span>}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
