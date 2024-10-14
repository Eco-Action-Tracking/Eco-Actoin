// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import EditProfile from '../../components/profile/EditProfile';
// import Orders from '../../components/profile/Orders';
// import Appointments from '../../components/profile/Appointments';
// import DiscountCodes from '../../components/profile/DiscountCodes';

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('edit');
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     console.log('ProfilePage mounted');
//     const fetchUserData = async () => {
//       console.log('Fetching user data');
//       try {
//         const response = await fetch('/api/profile/user/info', {
//           credentials: 'include'
//         });

//         console.log('Response status:', response.status);
//         if (response.ok) {
//           const userData = await response.json();
//           console.log('User data received:', userData);
//           setUser(userData);
//         } else {
//           throw new Error('Failed to fetch user data');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         router.push('/login');
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   if (!user) {
//     console.log('User not loaded, showing loading state');
//     return <div>Loading...</div>;
//   }

//   console.log('Rendering profile page for user:', user.username);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-5">
//           <h2 className="text-2xl font-semibold">{ user.username}</h2>
//         </div>
//         <nav className="mt-5">
//           <a
//             className={`block py-2 px-4 ${activeTab === 'edit' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             onClick={() => setActiveTab('edit')}
//           >
//             Edit Profile
//           </a>
//           <a
//             className={`block py-2 px-4 ${activeTab === 'orders' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             onClick={() => setActiveTab('orders')}
//           >
//             Orders
//           </a>
//           <a
//             className={`block py-2 px-4 ${activeTab === 'appointments' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             onClick={() => setActiveTab('appointments')}
//           >
//             Appointments
//           </a>
//           <a
//             className={`block py-2 px-4 ${activeTab === 'discounts' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
//             onClick={() => setActiveTab('discounts')}
//           >
//             Discount Codes
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         {activeTab === 'edit' && <EditProfile user={user} />}
//         {activeTab === 'orders' && <Orders userId={user._id} />}
//         {activeTab === 'appointments' && <Appointments userId={user._id} />}
//         {activeTab === 'discounts' && <DiscountCodes userId={user._id} />}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Edit2, ShoppingBag, Calendar, LogOut } from 'lucide-react';
import EditProfile from "../../components/profile/EditProfile";
import Orders from "../../components/profile/Orders";
import Appointments from "../../components/profile/Appointments";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile/user/info', {
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'edit':
        return <EditProfile user={user} />;
      case 'orders':
        return <Orders userId={user._id} />;
      case 'appointments':
        return <Appointments userId={user._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-2xl font-semibold text-green-800">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="flex border-b">
          {[
            { id: 'edit', icon: Edit2, label: 'Edit Profile' },
            { id: 'orders', icon: ShoppingBag, label: 'Orders' },
            { id: 'appointments', icon: Calendar, label: 'Appointments' },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center py-3 px-4 transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-green-100'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-5">
          {renderContent()}
        </div>
      </div>
      <div className="mt-5 text-center">
        <button
          onClick={() => {/* Implement logout logic */}}
          className="text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          <LogOut className="inline-block mr-2" size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;