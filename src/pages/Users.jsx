import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://103.164.54.252:8000/api/users',
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://103.164.54.252:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user.id);
    setEditFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
    });
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setEditFormData({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (id) => {
    try {
      await axios.put(
        `http://103.164.54.252:8000/api/users/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...editFormData } : user
        )
      );
      setEditUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editUser === user.id ? (
                  <input
                    type="text"
                    name="first_name"
                    value={editFormData.first_name}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.first_name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editUser === user.id ? (
                  <input
                    type="text"
                    name="last_name"
                    value={editFormData.last_name}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.last_name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editUser === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editFormData.username}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editUser === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editFormData.email}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editUser === user.id ? (
                  <>
                    <button
                      className="text-green-600 hover:text-green-900 mr-4"
                      onClick={() => handleUpdateUser(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
