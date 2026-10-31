// src/components/RecommendedBooksBlock/RecommendedBooksBlock.tsx
import { Link } from 'react-router-dom';
import { BookCard } from '../BookCard/BookCard';
import { Icon } from '../Icon/Icon';
import type { RecommendedBook } from '@/types';
import styles from './RecommendedBooksBlock.module.css';

interface RecommendedBooksBlockProps {
  books: RecommendedBook[];
  onBookClick?: (book: RecommendedBook) => void;
}

export const RecommendedBooksBlock = ({
  books,
  onBookClick,
}: RecommendedBooksBlockProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recommended books</h2>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard
            key={book._id}
            className={styles.bookCard}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
            onClick={() => onBookClick?.(book)}
          />
        ))}
      </div>
      <Link to="/recommended" className={styles.link}>
        Home <Icon name="icon-arrow-long-right" />
      </Link>
    </div>
  );
};
