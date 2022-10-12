import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { Spinner } from './ComponentIndex';

const style = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center"
}
const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={style}>
        <Spinner />
      </div>
    )
  }

  return (
    auth?.user || auth?.email ? <Outlet /> : <Navigate to='/signin' state={{from: location}} replace />
  )
}

export default ProtectedRoutes