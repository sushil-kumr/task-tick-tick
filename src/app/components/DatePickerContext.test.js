import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePickerProvider } from './DatePickerContext';
import DatePicker from './DatePicker';
import CustomRecurrence from './CustomRecurrence';

describe('Integration Test for DatePicker and CustomRecurrence', () => {
  it('renders DatePicker and CustomRecurrence together and allows interaction', () => {
    render(
      <DatePickerProvider>
        <DatePicker />
        <CustomRecurrence />
      </DatePickerProvider>
    );

    // Interact with DatePicker component
    const startDateInput = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDateInput, { target: { value: '2023-09-01' } });
    expect(startDateInput.value).toBe('2023-09-01');

    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: '2023-09-15' } });
    expect(endDateInput.value).toBe('2023-09-15');

    // Interact with CustomRecurrence component
    const intervalInput = screen.getByLabelText(/Every X/i);
    fireEvent.change(intervalInput, { target: { value: '5' } });
    expect(intervalInput.value).toBe('5');
  });
});

