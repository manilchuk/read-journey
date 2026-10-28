// src/components/LibraryBooks/LibraryBooks.tsx
import { BookCard } from '../BookCard/BookCard';
import { Icon } from '../Icon/Icon';
import booksImage from '@/assets/images/Recommendations/books.webp';
import type { Book } from '@/types';
import styles from './LibraryBooks.module.css';

interface LibraryBooksProps {
  books: Book[];
  onDelete: (id: string) => void;
  onOpenBook: (book: Book) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS = [
  { label: 'Unread', value: 'unread' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
  { label: 'All books', value: 'All books' },
];

export const LibraryBooks = ({
  books,
  onDelete,
  onOpenBook,
  selectedStatus,
  onStatusChange,
  isLoading = false,
}: LibraryBooksProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My library</h1>
        <select
          className={styles.select}
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : books.length === 0 ? (
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
