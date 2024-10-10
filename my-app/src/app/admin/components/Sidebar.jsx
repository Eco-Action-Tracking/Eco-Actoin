// src/app/admin/components/Sidebar.jsx

import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold p-4">Admin Dashboard</h1>
      <ul className="flex-grow">
        <li className="hover:bg-gray-700 p-2">
          <Link href="/admin/products">Products</Link>
        </li>
        <li className="hover:bg-gray-700 p-2">
          <Link href="/admin/orders">Orders</Link>
        </li>
        <li className="hover:bg-gray-700 p-2">
          <Link href="/admin/appointments">Appointments</Link>
        </li>
        <li className="hover:bg-gray-700 p-2">
          <Link href="/admin/contact">Contact Messages</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
