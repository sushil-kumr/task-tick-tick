import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDatePicker } from './DatePickerContext';
import PreviewCalendar from './PreviewCalendar';
import { generateRecurrenceDates } from '../utils/recurrenceUtils';

// Mock the context and utility functions
jest.mock('./DatePickerContext', () => ({
  useDatePicker: jest.fn(),
}));

jest.mock('../utils/recurrenceUtils', () => ({
  generateRecurrenceDates: jest.fn(),
}));

describe('PreviewCalendar Component', () => {
  it('displays a message if start date is not selected', () => {
    useDatePicker.mockReturnValue({
      startDate: null,
      endDate: null,
      recurrence: { frequency: 'daily', interval: 1 },
    });

    render(<PreviewCalendar />);

    const message = screen.getByText(/Please select a start date/i);
    expect(message).toBeInTheDocument();
  });

  it('renders recurrence preview when start date and recurrence are provided', () => {
    useDatePicker.mockReturnValue({
      startDate: '2023-09-01',
      endDate: '2023-09-10',
      recurrence: { frequency: 'daily', interval: 1 },
    });

    render(<PreviewCalendar />);

    const previewText = screen.getByText(/Recurs daily every 1 daily from 2023-09-01 to 2023-09-10./i);
    expect(previewText).toBeInTheDocument();
  });

  it('generates highlighted dates when startDate and recurrence are available', () => {
    useDatePicker.mockReturnValue({
      startDate: '2023-09-01',
      endDate: '2023-09-10',
      recurrence: { frequency: 'daily', interval: 1 },
    });

    const mockHighlightedDates = new Set(['2023-09-01', '2023-09-02', '2023-09-03']);
    generateRecurrenceDates.mockReturnValue(mockHighlightedDates);

    const { container } = render(<PreviewCalendar />);

    const highlightedDates = container.getElementsByClassName('highlight-date');
    expect(highlightedDates.length).toBe(3);  // Should highlight 3 dates in the mock
  });
});
