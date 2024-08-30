import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../style/Notify.css'
import 'react-calendar/dist/Calendar.css';
import '../style/SearchStyles.css'
import { useSnackbar } from 'notistack';


const BookingCalendar = ({ dateRange, setDateRange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const showSelectError = () => {
    enqueueSnackbar('Enter at least 2 days.', { variant: 'error', className: 'custom-snackbar', autoHideDuration: 5000 });
  };

  const titleDisabled = ({ date }) => {
    return date < new Date();
  }


  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) {
      showSelectError()
      return;
    }

    const [start, end] = dates;
    if (end - start < 2 * 24 * 60 * 60 * 1000 - 1) {
      showSelectError()
      return;
    }

    setDateRange(dates);
    setIsCalendarOpen(false); 
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="booking-calendar">
      
        <div className="input font" onClick={toggleCalendar}>
          {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}
        </div>
        {isCalendarOpen && (
          <div className="calendar-container font">
            <Calendar
              tileDisabled={titleDisabled}
              selectRange={true}
              onChange={handleDateChange}
              value={dateRange}
            />
          </div>
        )}
      
    </div>
  );
};

export default BookingCalendar;
