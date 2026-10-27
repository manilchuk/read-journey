// src/components/MobileMenu/MobileMenu.tsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { UserNav } from '../UserNav/UserNav';
import { Icon } from '../Icon/Icon';
import { useAppDispatch } from '@/redux/hooks';
import { logOut } from '@/redux/auth/slice';
import { signOut } from '@/services/auth';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/handleError';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      dispatch(logOut());
      onClose();
      navigate('/');
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <Icon name="icon-close" />
        </button>

        <div className={styles.navWrapper} onClick={onClose}>
          <UserNav />
        </div>

        <div className={styles.footer}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
