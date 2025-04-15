import React from 'react';

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      <div className="space-y-4">
        <p className="text-gray-600">Username: {user?.name}</p>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo; 