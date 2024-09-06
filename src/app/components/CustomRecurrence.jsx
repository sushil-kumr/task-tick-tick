"use client";

import React from 'react';
import { useDatePicker } from './DatePickerContext';

const CustomRecurrence = () => {
  const { customRecurrence, setCustomRecurrence } = useDatePicker();

  const handleIntervalChange = (e) => {
    setCustomRecurrence({ ...customRecurrence, interval: e.target.value });
  };

  return (
    <div>
      <label htmlFor="interval">Every X:</label>
      <input
        type="number"
        value={customRecurrence.interval}
        onChange={handleIntervalChange}
        className="border p-2 rounded"
        id="interval"
      />
    </div>
  );
};

export default CustomRecurrence;
