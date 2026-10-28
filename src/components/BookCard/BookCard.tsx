// src/components/BookCard/BookCard.tsx
import styles from './BookCard.module.css';

interface BookCardProps {
  title: string;
  author: string;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
}

export const BookCard = ({
  title,
  author,
  imageUrl,
  onClick,
  className,
}: BookCardProps) => {
  const rootClass = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} onClick={onClick}>
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
