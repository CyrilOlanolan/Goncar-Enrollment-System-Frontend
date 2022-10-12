import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user ? <Outlet /> : <Navigate to='/signin' state={{from: location}} replace />
  )
}

export default ProtectedRoutes