'use client';

import React from 'react';
import DatePicker from './components/DatePicker';
import RecurrenceOptions from './components/RecurrenceOptions';
import PreviewCalendar from './components/PreviewCalendar';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 space-y-4">
      <h1 className="text-4xl font-bold mb-4">Tick Tick App</h1>
      <DatePicker />
      <RecurrenceOptions />
      <PreviewCalendar /> {/* Mini calendar with recurrence dates */}
    </div>
  );
}
