import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { authData } = useAuth();

  if (!authData?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
