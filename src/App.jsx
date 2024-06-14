import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Profile from './pages/Profile';
import ArticlesAdmin from './pages/ArticlesAdmin';
import ArticlesOwner from './pages/ArticlesOwner';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/users"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="p-6 w-full">
                <Users />
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="p-6 w-full">
                <Profile />
              </div>
            </div>
          }
        />
        <Route
          path="/articles-admin"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="p-6 w-full">
                <ArticlesAdmin />
              </div>
            </div>
          }
        />
        <Route
          path="/articles-owner"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="p-6 w-full">
                <ArticlesOwner />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
