import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/SearchStyles.css'

const BookingCalendar = ({ onSearch }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates) => {
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
      {isCalendarOpen && (
        <div className="calendar-container font">
          <Calendar
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
