// src/components/LibraryBooks/LibraryBooks.tsx
import { useState } from 'react';
import { BookCard } from '../BookCard/BookCard';
import { Icon } from '../Icon/Icon';
import booksImage from '@/assets/images/Recommendations/books.webp';
import styles from './LibraryBooks.module.css';

interface LibraryBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  status: string;
}

interface LibraryBooksProps {
  books: LibraryBook[];
  onDelete: (id: string) => void;
  onOpenBook: (book: LibraryBook) => void;
}

const STATUS_OPTIONS = ['Unread', 'In progress', 'Done', 'All books'];

export const LibraryBooks = ({
  books,
  onDelete,
  onOpenBook,
}: LibraryBooksProps) => {
  const [status, setStatus] = useState('All books');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My library</h1>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {books.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <img src={booksImage} alt="" />
          </div>
          <p className={styles.emptyText}>
            To start training, add <span>some of your books</span> or from the
            recommended ones
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <div key={book._id} className={styles.cardWrapper}>
              <BookCard
                className={styles.bookCard}
                title={book.title}
                author={book.author}
                imageUrl={book.imageUrl}
                onClick={() => onOpenBook(book)}
              />
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(book._id);
                }}
                aria-label="Delete book"
              >
                <Icon name="icon-trash" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
