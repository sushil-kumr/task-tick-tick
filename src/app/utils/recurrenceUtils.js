export const generateRecurrenceDates = (startDate, recurrence, endDate) => {
  const dates = new Set();
  const start = new Date(startDate);

  // Handle endDate: if not provided, use a far future date to simulate indefinite recurrence
  const end = endDate ? new Date(endDate) : new Date();
  if (!endDate) {
    end.setFullYear(end.getFullYear() + 10); // Cap at 10 years in the future if no endDate is provided
  }

  let current = new Date(start);

  // Helper functions to add days, months, and years
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const addYears = (date, years) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  };

  // Add the start date itself to the set
  dates.add(start.toISOString().split('T')[0]);

  // Generate recurrence dates
  while (current < end) {
    
    if (recurrence.frequency === 'daily') {
      current = addDays(current, recurrence.interval);
    } else if (recurrence.frequency === 'weekly') {
      current = addDays(current, ((recurrence.interval * 7)));
    } else if (recurrence.frequency === 'monthly') {
      current = addMonths(current, recurrence.interval);
      // Ensure the day of the month stays the same, adjust if needed
      if (current.getDate() !== start.getDate()) {
        current.setDate(start.getDate());
      }
    } else if (recurrence.frequency === 'yearly') {
      current = addYears(current, recurrence.interval);
      // Ensure the day and month stay the same, adjust if needed
      if (current.getDate() !== start.getDate() || current.getMonth() !== start.getMonth()) {
        current.setDate(start.getDate());
        current.setMonth(start.getMonth());
      }
    }

    
    dates.add(current.toISOString().split('T')[0]);

    // Optional: add a break condition for very long recurrences
    if (dates.size > 10000) break; // Prevent excessive memory usage
  }
  
  return dates;
};