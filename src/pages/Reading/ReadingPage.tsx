// src/pages/Reading/ReadingPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddReadingForm } from '@/components/AddReadingForm/AddReadingForm';
import { DiaryBlock } from '@/components/DiaryBlock/DiaryBlock';
import { StatisticsBlock } from '@/components/StatisticsBlock/StatisticsBlock';
import { MyBook } from '@/components/MyBook/MyBook';
import { Modal } from '@/components/Modal/Modal';
import { BookIsReadModal } from '@/components/BookIsReadModal/BookIsReadModal';
import {
  getBookById,
  startReading,
  stopReading,
  deleteReading,
} from '@/services/books';
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
  const [isBookReadOpen, setIsBookReadOpen] = useState(false);

  const isBookDone = book?.status === 'done';

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
    if (isBookDone) {
      toast.error('This book is already read');
      return;
    }
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

      if (page >= book.totalPages) {
        setIsBookReadOpen(true);
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteEntry = async (readingId: string) => {
    if (!book) return;
    try {
      const updatedBook = await deleteReading(book._id, readingId);
      setBook(updatedBook);
      toast.success('Entry deleted');
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

  const timeLeftString = book.timeLeftToRead
    ? `${book.timeLeftToRead.hours} hours and ${book.timeLeftToRead.minutes} minutes left`
    : undefined;

  return (
    <div className={styles.page}>
      <Dashboard>
        {!isBookDone ? (
          <AddReadingForm
            isReading={isReading}
            onSubmit={isReading ? handleStop : handleStart}
            initialPage={currentPage}
          />
        ) : (
          <p className={styles.doneMessage}>This book is already read</p>
        )}

        {view === 'diary' ? (
          <DiaryBlock
            progress={book.progress}
            onDelete={handleDeleteEntry}
            onViewChange={setView}
          />
        ) : (
          <StatisticsBlock
            totalPages={book.totalPages}
            readPages={totalReadPages}
            onViewChange={setView}
          />
        )}
      </Dashboard>

      <MyBook
        title={book.title}
        author={book.author}
        imageUrl={book.imageUrl}
        isReading={isReading}
        timeLeft={timeLeftString}
      />

      <Modal isOpen={isBookReadOpen} onClose={() => setIsBookReadOpen(false)}>
        <BookIsReadModal />
      </Modal>
    </div>
  );
};
