import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDatePicker } from './DatePickerContext';
import CustomRecurrence from './CustomRecurrence';

// Mock the context
jest.mock('./DatePickerContext', () => ({
  useDatePicker: jest.fn(),
}));

describe('CustomRecurrence Component', () => {
  it('renders input and handles interval change', () => {
    const setCustomRecurrence = jest.fn();
    useDatePicker.mockReturnValue({
      customRecurrence: { interval: '5' }, // interval should be a string
      setCustomRecurrence,
    });

    render(<CustomRecurrence />);

    // Check input rendering with the correct initial value
    const input = screen.getByLabelText(/Every X/i);
    expect(input.value).toBe('5');

    // Simulate changing the interval
    fireEvent.change(input, { target: { value: '10' } });

    // Check that setCustomRecurrence is called with the correct value
    expect(setCustomRecurrence).toHaveBeenCalledWith({ interval: '10' });
  });
});
