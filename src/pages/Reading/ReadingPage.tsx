// src/pages/Reading/ReadingPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddReadingForm } from '@/components/AddReadingForm/AddReadingForm';
import { ProgressBlock } from '@/components/ProgressBlock/ProgressBlock';
import { MyBook } from '@/components/MyBook/MyBook';
import { getBookById } from '@/services/books';
import { getErrorMessage } from '@/utils/handleError';
import toast from 'react-hot-toast';
import type { Book } from '@/types';
import styles from './ReadingPage.module.css';

export const ReadingPage = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    let isCancelled = false;

    const loadBook = async () => {
      setIsLoading(true);
      try {
        const data = await getBookById(bookId);
        if (!isCancelled) setBook(data);
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

  const handleStart = (page: number) => {
    console.log('Start reading from page:', page);
    setIsReading(true);
  };

  const handleStop = (page: number) => {
    console.log('Stop reading at page:', page);
    setIsReading(false);
  };

  const handleToggleReading = () => {
    setIsReading(!isReading);
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

  return (
    <div className={styles.page}>
      <Dashboard>
        <AddReadingForm
          isReading={isReading}
          onSubmit={isReading ? handleStop : handleStart}
        />
        <ProgressBlock />
      </Dashboard>

      <MyBook
        title={book.title}
        author={book.author}
        imageUrl={book.imageUrl}
        isReading={isReading}
        onToggleReading={handleToggleReading}
      />
    </div>
  );
};
