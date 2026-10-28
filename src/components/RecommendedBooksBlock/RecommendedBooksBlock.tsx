// src/components/RecommendedBooksBlock/RecommendedBooksBlock.tsx
import { Link } from 'react-router-dom';
import { BookCard } from '../BookCard/BookCard';
import { Icon } from '../Icon/Icon';
import styles from './RecommendedBooksBlock.module.css';

interface RecommendedBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
}

interface RecommendedBooksBlockProps {
  books: RecommendedBook[];
}

export const RecommendedBooksBlock = ({
  books,
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
          />
        ))}
      </div>
      <Link to="/recommended" className={styles.link}>
        Home <Icon name="icon-arrow-long-right" />
      </Link>
    </div>
  );
};
