import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
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
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = new Date();
    if (hours < 8 || (hours === 8 && minutes < 0)) {
      currentTime.setHours(8, 0, 0);
    }
  }, [availableSlots, selectedTime, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    queryDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setCanFit(
      canFitInAvailableSlots(
        availableSlots,
        formatTime(time),
        formatTime(addHoursToTime(time, serviceDuration))
      )
    );
  };

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
    const month = date.getMonth() + 1;
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
    const start = parseInt(startTime);
    const end = parseInt(endTime);
    for (const slot of availableSlots) {
      const slotStart = parseInt(slot[0]);
      const slotEnd = parseInt(slot[1]);
      if (start >= slotStart && end <= slotEnd) {
        return true;
      }
    }
    return false;
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
        <Modal
          isOpen={showSuccessMessage}
          onRequestClose={() => setShowSuccessMessage(false)}
          className="successModal"
          overlayClassName="successOverlay"
        >
          <div className="successMessage">
            Yeeeeiy! You have successfully booked an appointment.
          </div>
        </Modal>
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
