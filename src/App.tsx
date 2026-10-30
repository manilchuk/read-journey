// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast } from './components/Toast/Toast';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { PublicRoute } from './components/Routes/PublicRoute';
import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RecommendedPage } from './pages/Recommended/RecommendedPage';
import { LibraryPage } from './pages/Library/LibraryPage';
import { ReadingPage } from './pages/Reading/ReadingPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setCredentials, logOut } from './redux/auth/slice';
import { getCurrentUser } from './services/auth';
import { getErrorMessage } from './utils/handleError';
import toast from 'react-hot-toast';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const restoreUser = async () => {
      if (token && !user) {
        try {
          const currentUser = await getCurrentUser();
          dispatch(setCredentials({ user: currentUser, token }));
        } catch (error: unknown) {
          toast.error(getErrorMessage(error));
          dispatch(logOut());
        }
      }
    };
    restoreUser();
  }, [token, user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/recommended" element={<RecommendedPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/reading" element={<ReadingPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
