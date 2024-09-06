'use client';  // Added to make this component client-side

import React from 'react';
import { useDatePicker } from './DatePickerContext';

const DatePicker = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();

  const onDateChange = (value, type) =>{

    if((startDate || (value && type==="start")) && (endDate || (value && type==="end"))){
      const start = new Date(type==="start"?value:startDate);
      const end = new Date(type==="end"?value:endDate);
    // Ensure endDate is always after startDate
      if (end < start) {
        alert("End date cannot be before start date.");
      }else{
        type==="start"?setStartDate(value):setEndDate(value)
      }
    }else{
      type==="start"?setStartDate(value):setEndDate(value)
    }
  }


  return (
    <div className="flex flex-row ">
      <div>
        <label  htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => onDateChange(e.target.value,"start")}
          className="border p-2 rounded w-full"
          id="startDate"
        />
      </div>
      <div className='mx-10'>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => onDateChange(e.target.value,"end")}
          className="border p-2 rounded w-full"
          id="endDate"
        />
      </div>
    </div>
  );
};

export default DatePicker;
