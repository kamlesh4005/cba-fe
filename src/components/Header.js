// src/components/Header.js
import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p>Welcome, {user.name} ({user.email})</p>
        </div>
        <button onClick={onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
