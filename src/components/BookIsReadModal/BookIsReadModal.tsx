// src/components/BookIsReadModal/BookIsReadModal.tsx
import booksImage from '@/assets/images/Recommendations/books.webp';
import styles from './BookIsReadModal.module.css';

export const BookIsReadModal = () => {
  return (
    <div className={styles.container}>
      <img src={booksImage} alt="Book is read" className={styles.image} />
      <h2 className={styles.title}>The book is read</h2>
      <p className={styles.text}>
        It was an <strong>exciting journey</strong> where each page revealed new
        horizons, and the characters became inseparable friends.
      </p>
    </div>
  );
};
