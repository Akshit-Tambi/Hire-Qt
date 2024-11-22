import React from 'react';
import { FaUser, FaCog, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For redirection

const ProfileButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token'); // Replace 'authToken' with your app's key
    localStorage.removeItem('bookmarkedJobs'); // Example: Clear other user-specific data if necessary
    
    // Redirect to login page
    navigate('/');
  };

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

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
          >
            <FaSignOutAlt className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
