// src/components/Header/Header.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Logo } from '../Logo/Logo';
import { UserNav } from '../UserNav/UserNav';
import { UserBar } from '../UserBar/UserBar';
import { Icon } from '../Icon/Icon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logOut } from '@/redux/auth/slice';
import { signOut } from '@/services/auth';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/handleError';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      dispatch(logOut());
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>

      {/* Навігація для планшетів та десктопів */}
      <div className={styles.desktopNav}>
        <UserNav />
      </div>

      <div className={styles.userActions}>
        <UserBar name={user?.name || 'User'} />

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>

        {/* Бургер для мобільних */}
        <button className={styles.burgerBtn}>
          <Icon name="icon-burger" />
        </button>
      </div>
    </header>
  );
};
