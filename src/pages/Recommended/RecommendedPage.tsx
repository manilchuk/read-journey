// src/pages/Recommended/RecommendedPage.tsx
import { useState, useEffect } from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { Filters } from '@/components/Filters/Filters';
import { StartWorkoutBlock } from '@/components/StartWorkoutBlock/StartWorkoutBlock';
import { BookCard } from '@/components/BookCard/BookCard';
import { Modal } from '@/components/Modal/Modal';
import { BookDetailsModal } from '@/components/BookDetailsModal/BookDetailsModal';
import { useBooksPerPage } from '@/hooks/useBooksPerPage';
import { getRecommendedBooks } from '@/services/books';
import { getErrorMessage } from '@/utils/handleError';
import toast from 'react-hot-toast';
import type { RecommendedBook } from '@/types';
import styles from './RecommendedPage.module.css';

export const RecommendedPage = () => {
  const limit = useBooksPerPage();

  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ title: '', author: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(
    null
  );

  // Коли змінюється кількість книжок на сторінці (зміна ширини екрана),
  // повертаємось на першу сторінку. Скидання під час рендеру не дає
  // зробити зайвий запит зі старим номером сторінки.
  const [prevLimit, setPrevLimit] = useState(limit);
  if (prevLimit !== limit) {
    setPrevLimit(limit);
    setPage(1);
  }

  useEffect(() => {
    // Прапорець не дає застарілій відповіді перезаписати новішу
    let isCancelled = false;

    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getRecommendedBooks({
          title: filters.title || undefined,
          author: filters.author || undefined,
          page,
          limit,
        });
        if (isCancelled) return;
        setBooks(data.results);
        setTotalPages(data.totalPages);
      } catch (error: unknown) {
        if (!isCancelled) toast.error(getErrorMessage(error));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadBooks();

    return () => {
      isCancelled = true;
    };
  }, [page, filters, limit]);

  const handleFilterSubmit = (title: string, author: string) => {
    setFilters({ title, author });
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddToLibrary = async (bookId: string) => {
    try {
      // Тут буде запит на бекенд (додамо пізніше)
      console.log('Add to library:', bookId);
      toast.success('Book added to library!');
      setSelectedBook(null);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className={styles.page}>
      <Dashboard>
        <Filters onSubmit={handleFilterSubmit} />
        <StartWorkoutBlock />
      </Dashboard>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Recommended</h1>
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handlePrevPage}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <svg aria-hidden="true">
                <use href="/sprite.svg#icon-arrow-left" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handleNextPage}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <svg aria-hidden="true">
                <use href="/sprite.svg#icon-arrow-right" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.placeholder}>Loading...</div>
        ) : books.length === 0 ? (
          <div className={styles.placeholder}>No books found</div>
        ) : (
          <div className={styles.grid}>
            {books.map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                imageUrl={book.imageUrl}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
        {selectedBook && (
          <BookDetailsModal
            book={selectedBook}
            onAddToLibrary={handleAddToLibrary}
          />
        )}
      </Modal>
    </div>
  );
};
