// src/components/UserNav/UserNav.tsx
import { NavLink } from 'react-router-dom';
import styles from './UserNav.module.css';

export const UserNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/recommended"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/library"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        My library
      </NavLink>
    </nav>
  );
};
