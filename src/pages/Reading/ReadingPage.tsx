// src/pages/Reading/ReadingPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddReadingForm } from '@/components/AddReadingForm/AddReadingForm';
import { DiaryBlock } from '@/components/DiaryBlock/DiaryBlock';
import { StatisticsBlock } from '@/components/StatisticsBlock/StatisticsBlock';
import { MyBook } from '@/components/MyBook/MyBook';
import { getBookById, startReading, stopReading } from '@/services/books';
import { getErrorMessage } from '@/utils/handleError';
import toast from 'react-hot-toast';
import type { Book } from '@/types';
import styles from './ReadingPage.module.css';

type View = 'diary' | 'statistics';

export const ReadingPage = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [view, setView] = useState<View>('diary');

  useEffect(() => {
    if (!bookId) return;

    let isCancelled = false;

    const loadBook = async () => {
      setIsLoading(true);
      try {
        const data = await getBookById(bookId);
        if (!isCancelled) {
          setBook(data);
          const activeProgress = data.progress.find(
            (p) => p.status === 'active'
          );
          setIsReading(!!activeProgress);
          const lastProgress = data.progress[data.progress.length - 1];
          if (lastProgress) {
            setCurrentPage(
              lastProgress.finishPage || lastProgress.startPage || 0
            );
          }
        }
      } catch (error: unknown) {
        if (!isCancelled) toast.error(getErrorMessage(error));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadBook();

    return () => {
      isCancelled = true;
    };
  }, [bookId]);

  const handleStart = async (page: number) => {
    if (!book) return;
    try {
      const updatedBook = await startReading(book._id, page);
      setBook(updatedBook);
      setIsReading(true);
      setCurrentPage(page);
      toast.success('Reading started!');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStop = async (page: number) => {
    if (!book) return;
    try {
      const updatedBook = await stopReading(book._id, page);
      setBook(updatedBook);
      setIsReading(false);
      setCurrentPage(page);
      toast.success('Reading stopped!');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteEntry = async (readingId: string) => {
    if (!book) return;
    try {
      console.log('Delete entry:', readingId);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <div className={styles.placeholder}>Loading...</div>;
  }

  if (!book) {
    return (
      <div className={styles.placeholder}>
        No book selected. Go to library to start reading.
      </div>
    );
  }

  const totalReadPages = book.progress.reduce((acc, entry) => {
    if (entry.finishPage && entry.startPage) {
      return acc + (entry.finishPage - entry.startPage);
    }
    return acc;
  }, 0);

  return (
    <div className={styles.page}>
      <Dashboard>
        <AddReadingForm
          isReading={isReading}
          onSubmit={isReading ? handleStop : handleStart}
          initialPage={currentPage}
        />

        {isReading ? (
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${view === 'diary' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('diary')}
            >
              <svg className={styles.viewIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-stopwatch" />
              </svg>
            </button>
            <button
              className={`${styles.viewBtn} ${view === 'statistics' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('statistics')}
            >
              <svg className={styles.viewIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-chart" />
              </svg>
            </button>
          </div>
        ) : null}

        {view === 'diary' ? (
          <DiaryBlock progress={book.progress} onDelete={handleDeleteEntry} />
        ) : (
          <StatisticsBlock
            totalPages={book.totalPages}
            readPages={totalReadPages}
          />
        )}
      </Dashboard>

      <MyBook
        title={book.title}
        author={book.author}
        imageUrl={book.imageUrl}
        isReading={isReading}
      />
    </div>
  );
};
