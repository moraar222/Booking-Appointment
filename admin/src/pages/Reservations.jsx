import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookingTable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/reservations'); // Assuming the endpoint for fetching bookings is /api/bookings
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>User Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Salon Name</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user._id}</td>
              <td>{booking.user.username}</td>
              <td>{booking.user.email}</td>
              <td>{booking.salon.name}</td>
              <td>{booking.bookingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookingTable;
