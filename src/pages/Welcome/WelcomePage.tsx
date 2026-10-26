import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';

export const WelcomePage = () => {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <Logo />
      <h1>Expand your mind, reading a book</h1>
      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          marginTop: 24,
        }}
      >
        <Link to="/register">Registration</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};
