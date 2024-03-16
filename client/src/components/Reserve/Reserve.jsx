import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, salonId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the current time and set it as the minimum selectable time for today
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = new Date();
    if (hours < 8 || (hours === 8 && minutes < 0)) {
      currentTime.setHours(8, 0, 0);
    }
    setSelectedTime(currentTime);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleClick = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        console.error("Date and time must be selected.");
        return;
      }

      const data = {
        selectedDate,
        selectedTime,
      };

      const response = await axios.post("/api/makeReservation", data);
      if (response.status === 201) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/ReserveSuccess");
        }, 3000);
      }
    } catch (err) {
      console.error("Error occurred during reservation:", err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select a day:</span>
        <div className="calendar">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            minDate={new Date()}
            inline
          />
        </div>
        <div>
          <p>Select time:Must be 1hr</p>
          <div className="timeInputs">
            <DatePicker
              selected={selectedTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minTime={new Date().setHours(8, 0, 0)}
              maxTime={new Date().setHours(20, 0, 0)}
            />
          </div>
        </div>
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
        {showSuccessMessage && (
          <div className="successMessage">
            Yeeeeiy! You have successfully booked an appointment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserve;