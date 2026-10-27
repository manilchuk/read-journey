// src/components/BookCard/BookCard.tsx
import styles from './BookCard.module.css';

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  onClick?: () => void;
}

export const BookCard = ({
  title,
  author,
  imageUrl,
  onClick,
}: BookCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <h3 className={styles.title} title={title}>
        {title}
      </h3>
      <p className={styles.author}>{author}</p>
    </div>
  );
};
