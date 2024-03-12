import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, salonId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("8am-9am");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to track if the success message should be shown
  const { data, loading, error } = useFetch(`/salons/stations/${salonId}`);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = async () => {
    try {
      const data = {
        selectedDate,
        time,
      };

      console.log(data);

      // Handle date selection and reservation logic here
      setOpen(false);
      setShowSuccessMessage(true); // Show success message when reservation is successful
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 3 seconds
        navigate("/"); // Redirect to home page after hiding the message
      }, 3000);
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
          <p>Select time</p>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="8am-9am">8am-9am</option>
            <option value="9am-10am">9am-10am</option>
            <option value="10am-11am">10am-11am</option>
            <option value="11am-12pm">11am-12pm</option>
            <option value="12pm-1pm">12pm-1pm</option>
            <option value="1pm-2pm">1pm-2pm</option>
            <option value="2pm-3pm">2pm-3pm</option>
            <option value="3pm-4pm">3pm-4pm</option>
            <option value="4pm-5pm">4pm-5pm</option>
            <option value="5pm-6pm">5pm-6pm</option>
            <option value="6pm-7pm">6pm-7pm</option>
            <option value="7pm-8pm">7pm-8pm</option>
          </select>
        </div>
        {/* <span>Enter start time:</span>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <span>Enter end time:</span>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        /> */}
        <button onClick={handleClick} className="rButton">
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