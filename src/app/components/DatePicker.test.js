import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDatePicker } from './DatePickerContext';
import DatePicker from './DatePicker';

// Mock the context
jest.mock('./DatePickerContext', () => ({
  useDatePicker: jest.fn(),
}));

describe('DatePicker Component', () => {
  it('handles start and end date changes correctly', () => {
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    useDatePicker.mockReturnValue({
      startDate: null,
      endDate: null,
      setStartDate,
      setEndDate,
    });

    render(<DatePicker />);

    // Simulate start date change
    const startDateInput = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDateInput, { target: { value: '2024-09-01' } });
    expect(setStartDate).toHaveBeenCalledWith('2024-09-01');

    // Simulate end date change
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: '2024-09-15' } });
    expect(setEndDate).toHaveBeenCalledWith('2024-09-15');
  });

  it('alerts if end date is before start date', () => {
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    window.alert = jest.fn();  // Mock alert
    useDatePicker.mockReturnValue({
      startDate: '2024-09-15',
      endDate: null,
      setStartDate,
      setEndDate,
    });

    render(<DatePicker />);

    // Simulate end date before start date
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: '2024-09-10' } });
    expect(window.alert).toHaveBeenCalledWith('End date cannot be before start date.');
  });

  it('update end date before start date update', () => {
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();

    // Mock useDatePicker to provide initial values and setter functions
    useDatePicker.mockReturnValue({
      startDate: null,
      endDate: null,
      setStartDate,
      setEndDate,
    });

    render(<DatePicker />);

    // Simulate end date update first
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: '2024-09-20' } });
    expect(setEndDate).toHaveBeenCalledWith('2024-09-20');

    // Simulate start date update
    const startDateInput = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDateInput, { target: { value: '2024-09-10' } });

    // Verify if setStartDate was called
    expect(setStartDate).toHaveBeenCalledWith('2024-09-10');
  });
});
