import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const role = Cookies.get('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('role');
    navigate('/');
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Web Article</h1>
      </div>
      <nav className="mt-6 flex-grow">
        <ul className="space-y-2">
          {role === 'admin' && (
            <>
              <li className="mb-2">
                <Link
                  to="/users"
                  className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Users
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/articles-admin"
                  className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Articles
                </Link>
              </li>
            </>
          )}
          {role === 'owner' && (
            <>
              <li className="mb-2">
                <Link
                  to="/profile"
                  className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/articles-owner"
                  className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Articles
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
