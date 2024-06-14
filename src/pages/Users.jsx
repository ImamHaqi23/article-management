/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTable } from 'react-table';

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
      await axios.delete(`http://103.164.54.252:8000/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Handle error or display error message
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

  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
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

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            {editUser === row.original.id ? (
              <button
                className="text-green-600 hover:text-green-900 mr-4"
                onClick={() => handleUpdateUser(row.original.id)}
              >
                Save
              </button>
            ) : (
              <button
                className="text-indigo-600 hover:text-indigo-900 mr-4"
                onClick={() => handleEditUser(row.original)}
              >
                Edit
              </button>
            )}
            <button
              className="text-red-600 hover:text-red-900"
              onClick={() => handleDeleteUser(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Initialize react-table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table
        className="min-w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {editUser === row.original.id ? (
                      <input
                        type="text"
                        name={cell.column.id}
                        value={editFormData[cell.column.id]}
                        onChange={handleFormChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
