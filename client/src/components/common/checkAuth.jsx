import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuthentication({ isAuthenticated, user, children }) {
  const location = useLocation(); // this will give you current url location 

  if (location.pathname === '/') {
    if (!isAuthenticated) {
      return <Navigate to='/auth/login' />
    } else {
      if (user?.role === "admin") {
        return <Navigate to='/admin/dashboard' />;
      } else {
        return <Navigate to='/shop/home' />
      }
    }
  }

  // Redirect to login if not authenticated and not on login/register pages

  if (!isAuthenticated && !location.pathname.includes('/login') && !location.pathname.includes('/register')) {
    return <Navigate to='/auth/login' />;
  }
  // Redirect authenticated users from login/register to their respective dashboards
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {

    if (user?.role === "admin") {
      return <Navigate to='/admin/dashboard' />;
    } else {
      return <Navigate to='/shop/home' />
    }
  }
  // Redirect non-admin users trying to access admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')
  ) {
    return <Navigate to='/unauthPage' />
  }
  // Redirect admin users trying to access shop route
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')
  ) {
    return <Navigate to='/admin/dashboard' />
  }
  // If all checks pass, render children

  return <> {children}</>


}

export default CheckAuthentication;