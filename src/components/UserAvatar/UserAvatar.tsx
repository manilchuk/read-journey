// src/components/UserAvatar/UserAvatar.tsx
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  name: string;
}

export const UserAvatar = ({ name }: UserAvatarProps) => {
  const initial = Array.from(name.trim())[0]?.toUpperCase() ?? '';

  return (
    <div className={styles.avatar} role="img" aria-label={name}>
      {initial}
    </div>
  );
};
