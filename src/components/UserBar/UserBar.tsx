// src/components/UserBar/UserBar.tsx
import { UserAvatar } from '../UserAvatar/UserAvatar';
import styles from './UserBar.module.css';

interface UserBarProps {
  name: string;
}

export const UserBar = ({ name }: UserBarProps) => {
  return (
    <div className={styles.userBar}>
      <UserAvatar name={name} />
      <span className={styles.userName}>{name}</span>
    </div>
  );
};
