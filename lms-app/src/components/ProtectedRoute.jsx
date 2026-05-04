import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ userRole, allowedRoles }) => {
  if (userRole === null) return null; 

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// ESTA LÍNEA ES LA QUE FALTA O ESTÁ MAL:
export default ProtectedRoute;