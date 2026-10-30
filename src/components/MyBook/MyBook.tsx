// src/components/MyBook/MyBook.tsx
import { Icon } from '../Icon/Icon';
import styles from './MyBook.module.css';

interface MyBookProps {
  title: string;
  author: string;
  imageUrl: string;
  isReading: boolean;
  timeLeft?: string;
}

export const MyBook = ({
  title,
  author,
  imageUrl,
  isReading,
  timeLeft,
}: MyBookProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My reading</h1>
        {timeLeft && <span className={styles.timeLeft}>{timeLeft}</span>}
      </div>
      <div className={styles.book}>
        <img src={imageUrl} alt={title} className={styles.cover} />
        <h2 className={styles.bookTitle}>{title}</h2>
        <p className={styles.author}>{author}</p>
        <div
          className={styles.indicator}
          aria-label={isReading ? 'Reading in progress' : 'Not reading'}
        >
          <Icon
            name={isReading ? 'icon-stop' : 'icon-start'}
            className={isReading ? styles.stopIcon : styles.startIcon}
          />
        </div>
      </div>
    </div>
  );
};
