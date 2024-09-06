import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import for toBeInTheDocument
import { useDatePicker } from './DatePickerContext';
import RecurrenceOptions from './RecurrenceOptions';

// Mock the context
jest.mock('./DatePickerContext', () => ({
  useDatePicker: jest.fn(),
}));

describe('RecurrenceOptions Component', () => {
  it('handles frequency and interval changes', () => {
    const setRecurrence = jest.fn();
    useDatePicker.mockReturnValue({
      recurrence: { frequency: 'daily', interval: 1 },
      setRecurrence,
    });

    render(<RecurrenceOptions />);

    // Simulate frequency change
    const select = screen.getByLabelText(/Recurrence Frequency:/i);
    fireEvent.change(select, { target: { value: 'weekly' } });
    expect(setRecurrence).toHaveBeenCalledWith({
      frequency: 'weekly',
      interval: 1,
    });

    // Simulate interval change
    const input = screen.getByLabelText(/Recurrence Every:/i);
    fireEvent.change(input, { target: { value: '10' } });
    expect(setRecurrence).toHaveBeenCalledWith({
      frequency: 'weekly',
      interval: 10,
    });
  });

  it('displays error when interval is less than 1', () => {
    const setRecurrence = jest.fn();
    useDatePicker.mockReturnValue({
      recurrence: { frequency: 'daily', interval: 1 },
      setRecurrence,
    });

    render(<RecurrenceOptions />);

    // Simulate interval change to a value less than 1
    const input = screen.getByLabelText(/Recurrence Every:/i);
    fireEvent.change(input, { target: { value: '0' } });

    // Check if the error message appears when interval is less than 1
    const errorMessage = screen.getByText(/Value must be 1 or above/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
