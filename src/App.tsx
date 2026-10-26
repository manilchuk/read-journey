// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast } from './components/Toast/Toast';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { PublicRoute } from './components/Routes/PublicRoute';
import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginPage } from './pages/Auth/LoginPage';

function App() {
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
            <Route path="/recommended" element={<div>Recommended Page</div>} />
            <Route path="/library" element={<div>Library Page</div>} />
            <Route path="/reading" element={<div>Reading Page</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
