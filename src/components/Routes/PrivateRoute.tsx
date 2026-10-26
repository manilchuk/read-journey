import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
