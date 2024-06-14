import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import AdminArticles from '../pages/AdminArticles';
import AdminUsers from '../pages/AdminUsers';
import OwnerArticles from '../pages/OwnerArticles';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'articles',
        element: <AdminArticles />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
    ],
  },
  {
    path: '/owner',
    element: <OwnerLayout />,
    children: [
      {
        path: 'articles',
        element: <OwnerArticles />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">{/* Page content */}</div>
    </div>
  );
}

function OwnerLayout() {
  return (
    <div className="flex">
      <OwnerSidebar />
      <div className="flex-1">{/* Page content */}</div>
    </div>
  );
}
