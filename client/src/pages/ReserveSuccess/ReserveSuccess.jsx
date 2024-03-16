import React from "react";
import { Link } from "react-router-dom";

const ReserveSuccess = () => {
  return (
    <div>
      <h2>Reservation Successful!</h2>
      <p>Your reservation has been successfully booked.</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default ReserveSuccess;