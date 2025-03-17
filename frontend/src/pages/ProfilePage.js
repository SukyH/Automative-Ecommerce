import React, { useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john.doe@example.com' });

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default ProfilePage;
