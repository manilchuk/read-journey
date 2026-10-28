// src/pages/Library/LibraryPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddBookForm } from '@/components/AddBookForm/AddBookForm';
import { RecommendedBooksBlock } from '@/components/RecommendedBooksBlock/RecommendedBooksBlock';
import { LibraryBooks } from '@/components/LibraryBooks/LibraryBooks';
import {
  getOwnBooks,
  addBook,
  removeBook,
  getRecommendedBooks,
} from '@/services/books';
import { getErrorMessage } from '@/utils/handleError';
import toast from 'react-hot-toast';
import type { Book, RecommendedBook } from '@/types';
import styles from './LibraryPage.module.css';

export const LibraryPage = () => {
  const [ownBooks, setOwnBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBook[]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('All books');
  const [isLoading, setIsLoading] = useState(false);

  // Функція для ручного оновлення списку (після додавання/видалення)
  const loadOwnBooks = useCallback(async (status: string) => {
    setIsLoading(true);
    try {
      const data = await getOwnBooks(
        status === 'All books' ? undefined : status
      );
      setOwnBooks(data);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Завантаження рекомендованих книг (один раз)
  useEffect(() => {
    const loadRecommended = async () => {
      try {
        const data = await getRecommendedBooks({ limit: 3, page: 1 });
        setRecommendedBooks(data.results);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      }
    };
    loadRecommended();
  }, []);

  // Завантаження власних книг при зміні фільтра
  useEffect(() => {
    let isCancelled = false;

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getOwnBooks(
          selectedStatus === 'All books' ? undefined : selectedStatus
        );
        if (!isCancelled) {
          setOwnBooks(data);
        }
      } catch (error: unknown) {
        if (!isCancelled) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isCancelled = true;
    };
  }, [selectedStatus]);

  const handleAddBook = async (values: {
    title: string;
    author: string;
    totalPages: number;
  }) => {
    try {
      await addBook(values);
      toast.success('Book added to library!');
      loadOwnBooks(selectedStatus);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (message.toLowerCase().includes('already exists')) {
        toast.error('This book is already in your library');
      } else {
        toast.error(message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeBook(id);
      toast.success('Book removed from library');
      loadOwnBooks(selectedStatus);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleOpenBook = (book: Book) => {
    console.log('Open book:', book);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className={styles.page}>
      <Dashboard>
        <AddBookForm onSubmit={handleAddBook} />
        <RecommendedBooksBlock books={recommendedBooks} />
      </Dashboard>

      <LibraryBooks
        books={ownBooks}
        onDelete={handleDelete}
        onOpenBook={handleOpenBook}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />
    </div>
  );
};
