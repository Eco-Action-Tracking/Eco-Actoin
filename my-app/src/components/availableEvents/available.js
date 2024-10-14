// app/components/AvailableEvents.js
// 'use client'; // This directive allows this component to use React hooks

// import { useEffect, useState } from 'react';

// const AvailableEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//         try {
//           const response = await fetch('/api/availableEvents');
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//           console.log('Fetched data:', data); // Add this line
//           setEvents(data);
//         } catch (err) {
//           console.error('Fetch error:', err); // Add this line
//           setError(err.message || 'An error occurred while fetching events');
//         } finally {
//           setLoading(false);
//         }
//       };
//     fetchEvents();
//   }, []);

 

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//     <h1>Available Events</h1>
//     <ul>
//       {events.map((event) => (
//         <li key={event._id}>
          
//           {new Date(event.available_date).toLocaleDateString()} - {event.available_start_time} to {event.available_end_time}
//           {event.price && <span> - ${event.price}</span>}-{event.numSubscribers

//          &&<span> - {event.numSubscribers
// }</span>}
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// };

// export default AvailableEvents;
// app/components/AvailableEvents.js


// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Clock, DollarSign, UsersRound } from "lucide-react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const AvailableEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("/api/availableEvents");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching events");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleBook = async (event) => {
//     const result = await Swal.fire({
//       title: "Book Event",
//       text: `Do you want to book this event?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, book it!",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#10B981",
//       cancelButtonColor: "#EF4444",
//     });

//     if (result.isConfirmed) {
//       try {
//         const updateResponse = await axios.put(
//           `/api/updateAvailability/${event._id}`
//         );
//         if (updateResponse.status !== 200) {
//           throw new Error("Failed to update availability");
//         }

//         const appointmentResponse = await axios.post(`/api/appointments/${userId}`, {
//           available_id: event._id,
//         });

//         if (appointmentResponse.status !== 200) {
//           throw new Error("Failed to book the appointment");
//         }

//         Swal.fire(
//           "Booked!",
//           "Your appointment has been booked successfully.",
//           "success"
//         );
//       } catch (error) {
//         Swal.fire("Error", error.message, "error");
//       }
//     }
//   };


//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (error)
//     return <div className="text-center py-20 text-red-500">Error: {error}</div>;

//   return (
//     <section id="available-events" className="py-20 bg-indigo-50">
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl font-bold mb-4 text-indigo-800">
//             Available Work Shops
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Browse our upcoming events and book your spot today!
//           </p>
//         </motion.div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <motion.div
//               key={event._id}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Calendar className="text-indigo-500 mr-2" />
//                   <span className="text-gray-700">
//                     {new Date(event.available_date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <Clock className="text-indigo-500 mr-2" />
//                   <span className="text-gray-700">
//                     {event.available_start_time} - {event.available_end_time}
//                   </span>
//                 </div>
//                 <div className="flex items-center mb-6">
//                   <UsersRound className="text-indigo-500 mr-2" />
//                   <span className="text-gray-700">{event.numSubscribers}</span>
//                 </div>
//                 <button
//                   onClick={() => handleBook(event)}
//                   className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AvailableEvents;









// app/components/AvailableEvents.js
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, UsersRound } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AvailableEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // حالة لتخزين userId

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/availableEvents");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching events");
      } finally {
        setLoading(false);
      }
    };
    
    // استرداد userId من الكوكيز
    // const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    // if (token) {
    //   const decodedToken = JSON.parse(atob(token.split('.')[1])); // فك تشفير التوكن
    //   setUserId(decodedToken.userId); // تعيين userId
    // }
    // استرداد userId من الكوكيز
const token = document.cookie.split('; ').find(row => row.startsWith('token='));
if (token) {
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // فك تشفير التوكن
  setUserId(decodedToken.userId); // تعيين userId
} else {
  console.error("No token found in cookies");
}

    
    fetchEvents();
  }, []);

  const handleBook = async (event) => {
    const result = await Swal.fire({
      title: "Book Event",
      text: `Do you want to book this event?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    });

    if (result.isConfirmed) {
      try {
        const updateResponse = await axios.put(
          `/api/updateAvailability/${event._id}`
        );
        if (updateResponse.status !== 200) {
          throw new Error("Failed to update availability");
        }

        const appointmentResponse = await axios.post(`/api/appointments/${userId}`, {
          available_id: event._id,
        });
        

        if (appointmentResponse.status !== 201) { // 201 هو الكود الصحيح عند نجاح الحجز
          throw new Error("Failed to book the appointment");
        }

        Swal.fire(
          "Booked!",
          "Your appointment has been booked successfully.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <section id="available-events" className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-indigo-800">
            Available Work Shops
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our upcoming events and book your spot today!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="text-indigo-500 mr-2" />
                  <span className="text-gray-700">
                    {new Date(event.available_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="text-indigo-500 mr-2" />
                  <span className="text-gray-700">
                    {event.available_start_time} - {event.available_end_time}
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <UsersRound className="text-indigo-500 mr-2" />
                  <span className="text-gray-700">{event.numSubscribers}</span>
                </div>
                <button
                  onClick={() => handleBook(event)}
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableEvents;
