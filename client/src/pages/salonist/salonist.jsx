import React, { useState } from 'react';
import axios from 'axios';

const SalonistList = ({ salonists, userId }) => {
  const [selectedSalonist, setSelectedSalonist] = useState('');

  const handleSalonistSelection = async () => {
    try {
      const response = await axios.post('/api/reserve-salonist', {
        userId,
        salonistId: selectedSalonist,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Salonist List</h2>
      <select value={selectedSalonist} onChange={(e) => setSelectedSalonist(e.target.value)}>
        <option value="">Select a salonist</option>
        {salonists.map((salonist) => (
          <option key={salonist._id} value={salonist._id}>
            {salonist.name}
          </option>
        ))}
      </select>
      <button onClick={handleSalonistSelection}>Reserve Salonist</button>
    </div>
  );
};

export default SalonistList;