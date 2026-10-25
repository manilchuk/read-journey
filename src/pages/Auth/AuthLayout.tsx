// src/pages/Auth/AuthLayout.tsx
import type { ReactNode } from 'react';
import { Logo } from '@/components/Logo/Logo';
import authDesktop from '@/assets/images/auth/authDesktop.webp';
import authDesktop2x from '@/assets/images/auth/authDesktop2x.webp';

import authMobile from '@/assets/images/auth/authMobile.webp';
import authMobile2x from '@/assets/images/auth/authMobile2x.webp';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.authPage}>
      <div className={styles.authLeft}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <div className={styles.authContent}>
          <h1 className={styles.title}>
            Expand your mind, reading{' '}
            <span className={styles.titleMuted}>a book</span>
          </h1>
          {children}
        </div>
      </div>

      <div className={styles.authRight}>
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={`${authMobile} 1x, ${authMobile2x} 2x`}
          />

          <source
            media="(min-width: 1440px)"
            srcSet={`${authDesktop} 1x, ${authDesktop2x} 2x`}
          />

          <img
            src={authDesktop}
            alt="Read Journey application on a smartphone"
            className={styles.authImage}
          />
        </picture>
      </div>
    </div>
  );
};
