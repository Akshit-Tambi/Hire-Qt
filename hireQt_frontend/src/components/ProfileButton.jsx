import React from 'react';
import { FaUser, FaCog, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const ProfileButton = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <FaUser className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700">Profile</span>
      </button>
      
      <div className="absolute right-0 w-48 py-2 mt-1 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="flex flex-col">
          <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
            <FaCog className="w-4 h-4 mr-3" />
            <span>Profile Settings</span>
          </a>
          
          <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
            <FaFileAlt className="w-4 h-4 mr-3" />
            <span>Update Resume</span>
          </a>
          
          <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
            <FaSignOutAlt className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;