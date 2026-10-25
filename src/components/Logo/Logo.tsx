/* src/components/Logo/Logo.tsx */

import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      {/* Логотип для мобільних */}
      <Icon name="icon-logo-m" className={styles.logoMobile} />

      {/* Логотип для планшетів і десктопів */}
      <Icon name="icon-logo-text" className={styles.logoDesktop} />
    </Link>
  );
};
