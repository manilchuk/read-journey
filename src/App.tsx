// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast } from './components/Toast/Toast';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginPage } from './pages/Auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome Page</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/recommended" element={<div>Recommended Page</div>} />
        <Route path="/library" element={<div>Library Page</div>} />
        <Route path="/reading" element={<div>Reading Page</div>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
