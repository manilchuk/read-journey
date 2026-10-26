// src/pages/Welcome/WelcomePage.tsx
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import styles from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <h1 className={styles.title}>
          Expand your mind, reading{' '}
          <span className={styles.titleMuted}>a book</span>
        </h1>

        <div className={styles.actions}>
          <Link to="/register" className={styles.btnPrimary}>
            Registration
          </Link>
          <Link to="/login" className={styles.btnSecondary}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
