// src/app/admin/components/ContactMessages.jsx

"use client";

import { useEffect, useState } from 'react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await fetch('/api/admin/contact');
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Contact Messages</h2>
      <ul className="space-y-2">
        {messages.map((message) => (
          <li key={message._id} className="border p-2 rounded">
            <h3 className="font-semibold">{message.name}</h3>
            <p>{message.email}</p>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;
