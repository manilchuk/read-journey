// src/components/BookDetailsModal/BookDetailsModal.tsx
import styles from './BookDetailsModal.module.css';

interface BookDetailsModalProps {
  book: {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
  };
  actionLabel: string;
  onAction: (id: string) => void;
}

export const BookDetailsModal = ({
  book,
  actionLabel,
  onAction,
}: BookDetailsModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={book.imageUrl} alt={book.title} className={styles.image} />
      </div>
      <h2 className={styles.title}>{book.title}</h2>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.pages}>{book.totalPages} pages</p>
      <button className={styles.addBtn} onClick={() => onAction(book._id)}>
        {actionLabel}
      </button>
    </div>
  );
};
