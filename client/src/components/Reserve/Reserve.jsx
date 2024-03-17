import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Reserve = ({
  setOpen,
  salonId,
  serviceName,
  serviceDuration,
  servicePrice,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [canFit, setCanFit] = useState(false);
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
    // setSelectedTime(currentTime);
  }, [availableSlots, selectedTime, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    queryDate(date);
  };

  const handleTimeChange = (time) => {    
    setSelectedTime(time);
    setCanFit(canFitInAvailableSlots(availableSlots,formatTime(time),formatTime(addHoursToTime(time, serviceDuration))));
    
  };

  /**
   * Fetch all available slots for a specific date
   */
  const queryDate = async (date) => {
    try {
      const response = await axios.get("/reservations", {
        params: { selectedDate: date },
      });
      setAvailableSlots(response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-indexed, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}${minutes}`;
  }

  function addHoursToTime(initialTime, hoursToAdd) {
    const date = new Date(initialTime);    
    date.setHours(date.getHours() + hoursToAdd);
    return date;
  }

  function canFitInAvailableSlots(availableSlots, startTime, endTime) {
    // Convert start and end times to numbers for comparison
    const start = parseInt(startTime);
    const end = parseInt(endTime);

    // Iterate over each available slot
    for (const slot of availableSlots) {
      const slotStart = parseInt(slot[0]);
      const slotEnd = parseInt(slot[1]);

      // Check if the provided start and end times fit within the current slot
      if (start >= slotStart && end <= slotEnd) {

        return true; // The times fit in this slot
      }
    }

    return false; // No slot found to fit the times
  }

  const handleClick = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        console.error("Date and time must be selected.");
        return;
      }

      const data = {
        date: formatDate(selectedDate),
        startTime: formatTime(selectedTime),
        endTime: formatTime(addHoursToTime(selectedTime, serviceDuration)),
        serviceName: serviceName,
        duration: serviceDuration,
        price: servicePrice,
      };
      console.log("data::", data);

      const response = await axios.post("/makeReservation", data);

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
          <p>Select time:</p>
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
        <button disabled={!canFit} className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
        {showSuccessMessage && (
          <div className="successMessage">
            Yeeeeiy! You have successfully booked an appointment.
          </div>
        )}
      </div>
      <div className="available-slots">
        <p>Available Slots for {selectedDate && formatDate(selectedDate)}</p>
        <ul>
          {availableSlots.map((slot, index) => {
            const startTime = slot[0];
            const endTime = slot[1];
            const formattedSlot = `${startTime} to ${endTime}`;
            return (
              index !== availableSlots.length && (
                <li key={index}>{formattedSlot}</li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Reserve;
