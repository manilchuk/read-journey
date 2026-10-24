import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast } from './components/Toast/Toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публічні маршрути */}
        <Route path="/" element={<div>Welcome Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />

        {/* Приватні маршрути */}
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
