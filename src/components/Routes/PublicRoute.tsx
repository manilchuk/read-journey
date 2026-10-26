import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

export const PublicRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/recommended" replace /> : <Outlet />;
};
