"use client";

import React, { createContext, useState, useContext } from 'react';

const DatePickerContext = createContext();

export const DatePickerProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recurrence, setRecurrence] = useState({ frequency: 'daily', interval: 1 });

  return (
    <DatePickerContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        recurrence,
        setRecurrence
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
