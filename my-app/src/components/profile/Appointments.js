// import React, { useState, useEffect } from 'react';

// const Appointments = ({ userId }) => {
//   const [appointments, setAppointments] = useState({ scheduled: [], completed: [] });

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`/api/profile/appointments/${userId}`);

//         if (response.ok) {
//           const data = await response.json();
//           setAppointments(data);
//         } else {
//           throw new Error('Failed to fetch appointments');
//         }
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
//       <div className="space-y-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Scheduled Appointments</h3>
//           {appointments.scheduled.map(appointment => (
//             <div key={appointment._id} className="border p-4 rounded mb-2">
//               <p>Appointment ID: {appointment._id}</p>
//               <p>Date: {new Date(appointment.available_id.available_date).toLocaleDateString()}</p>
//               <p>Time: {appointment.available_id.available_start_time} - {appointment.available_id.available_end_time}</p>
//               <p>Status: {appointment.status}</p>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Completed Appointments</h3>
//           {appointments.completed.map(appointment => (
//             <div key={appointment._id} className="border p-4 rounded mb-2">
//               <p>Appointment ID: {appointment._id}</p>
//               <p>Date: {new Date(appointment.available_id.available_date).toLocaleDateString()}</p>
//               <p>Time: {appointment.available_id.available_start_time} - {appointment.available_id.available_end_time}</p>
//               <p>Status: {appointment.status}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Appointments;








"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Appointments = ({ userId }) => {
  const [appointments, setAppointments] = useState({ scheduled: [], completed: [] });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/profile/appointments/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          throw new Error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Appointments</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Scheduled Appointments</h3>
          {appointments.scheduled.map(appointment => (
            <div key={appointment._id} className="border p-4 rounded-md mb-2 bg-green-50">
              <p className="text-gray-700">Date: {new Date(appointment.available_id.available_date).toLocaleDateString()}</p>
              <p className="text-gray-700">Time: {appointment.available_id.available_start_time} - {appointment.available_id.available_end_time}</p>
              <p className="text-gray-700">Status: {appointment.status}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Completed Appointments</h3>
          {appointments.completed.map(appointment => (
            <div key={appointment._id} className="border p-4 rounded-md mb-2 bg-green-50">
              <p className="text-gray-700">Date: {new Date(appointment.available_id.available_date).toLocaleDateString()}</p>
              <p className="text-gray-700">Time: {appointment.available_id.available_start_time} - {appointment.available_id.available_end_time}</p>
              <p className="text-gray-700">Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Appointments;