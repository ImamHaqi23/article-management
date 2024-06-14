import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'http://103.164.54.252:8000/api/auth/me',
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <dl className="space-y-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{userProfile.id}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">First Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userProfile.first_name}
            </dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userProfile.last_name}
            </dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userProfile.username}
            </dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{userProfile.email}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900">{userProfile.role}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default UserProfile;
