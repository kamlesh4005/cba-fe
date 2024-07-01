// src/pages/User.js
import React from 'react';

const User = ({ match }) => {
  return <h1>User ID: {match.params.userId}</h1>;
};

export default User;
