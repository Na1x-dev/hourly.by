import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { ToastContainer, toast } from 'react-toastify';
import '../style/Notify.css'
import 'react-calendar/dist/Calendar.css';
import '../style/SearchStyles.css'


const BookingCalendar = ({ dateRange, setDateRange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const titleDisabled = ({ date }) => {
    return date < new Date();
  }
  const selectError = () => {
    toast.dismiss();
    toast.error('Please select at least 2 days.', {
      autoClose: 3000,
      onClick: () => {
        toast.dismiss(); 
      },
    });
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) {
      selectError();
      return;
    }

    const [start, end] = dates;
    if (end - start < 2 * 24 * 60 * 60 * 1000 - 1) {
      selectError();
      return;
    }

    setDateRange(dates);
    setIsCalendarOpen(false); // Закрыть календарь после выбора дат
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="booking-calendar">
      
      <div className="input font" onClick={toggleCalendar}>
        {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}
      </div>
      <ToastContainer/>
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
