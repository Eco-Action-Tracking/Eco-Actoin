
"use client";

import { useEffect, useState } from 'react';

const AvailabilityForm = () => {
  const [availability, setAvailability] = useState({ 
    available_date: '', 
    available_start_time: '', 
    available_end_time: '', 
    price: '', 
    numSubscribers: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availabilities, setAvailabilities] = useState([]);

  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availability),
      });

      if (!response.ok) {
        throw new Error('Failed to create availability event');
      }

      const data = await response.json();
      setSuccess('Availability event created successfully!');
      setAvailability({ 
        available_date: '', 
        available_start_time: '', 
        available_end_time: '', 
        price: '', 
        numSubscribers: '' 
      }); // Reset form fields

      // Refetch availabilities after adding a new one
      fetchAvailabilities();

    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch('/api/admin/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch availabilities');
      }
      const data = await response.json();
      setAvailabilities(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAvailabilities(); // Fetch availabilities on component mount
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        
        <div>
          <label className="block text-gray-700">Available Date</label>
          <input
            type="date"
            name="available_date"
            value={availability.available_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            name="available_start_time"
            value={availability.available_start_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            name="available_end_time"
            value={availability.available_end_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={availability.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Number of Subscribers</label>
          <input
            type="number"
            name="numSubscribers"
            value={availability.numSubscribers}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Create Availability Event
        </button>
      </form>

      <h2 className="mt-6 text-xl font-bold">Existing Availability Events</h2>
      <div className="mt-4">
        {availabilities.length === 0 ? (
          <p>No availability events found.</p>
        ) : (
          <ul className="space-y-2">
            {availabilities.map((availability) => (
              <li key={availability._id} className="border border-gray-300 p-4 rounded">
                <p><strong>Date:</strong> {new Date(availability.available_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {availability.available_start_time} - {availability.available_end_time}</p>
                <p><strong>Price:</strong> ${availability.price}</p>
                <p><strong>Subscribers:</strong> {availability.numSubscribers}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailabilityForm;
