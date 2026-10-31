// src/pages/Library/LibraryPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddBookForm } from '@/components/AddBookForm/AddBookForm';
import { RecommendedBooksBlock } from '@/components/RecommendedBooksBlock/RecommendedBooksBlock';
import { LibraryBooks } from '@/components/LibraryBooks/LibraryBooks';
import { Modal } from '@/components/Modal/Modal';
import { GoodJobModal } from '@/components/GoodJobModal/GoodJobModal';
import { BookDetailsModal } from '@/components/BookDetailsModal/BookDetailsModal';
import {
  getOwnBooks,
  addBook,
  removeBook,
  getRecommendedBooks,
  addRecommendedBook,
} from '@/services/books';
import { getErrorMessage } from '@/utils/handleError';
import toast from 'react-hot-toast';
import type { Book, RecommendedBook } from '@/types';
import styles from './LibraryPage.module.css';

export const LibraryPage = () => {
  const navigate = useNavigate();

  const [ownBooks, setOwnBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<RecommendedBook[]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('All books');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoodJobOpen, setIsGoodJobOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedRecommendedBook, setSelectedRecommendedBook] =
    useState<RecommendedBook | null>(null);
  const [isAdding, setIsAdding] = useState(false);

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

  useEffect(() => {
    let isCancelled = false;

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getOwnBooks(
          selectedStatus === 'All books' ? undefined : selectedStatus
        );
        if (!isCancelled) setOwnBooks(data);
      } catch (error: unknown) {
        if (!isCancelled) toast.error(getErrorMessage(error));
      } finally {
        if (!isCancelled) setIsLoading(false);
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
      setIsGoodJobOpen(true);
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
    setSelectedBook(book);
  };

  const handleStartReading = (id: string) => {
    navigate(`/reading?bookId=${id}`);
    setSelectedBook(null);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  // Клік на картку в блоці Recommended books
  const handleRecommendedBookClick = (book: RecommendedBook) => {
    setSelectedRecommendedBook(book);
  };

  // Додавання з Recommended books
  const handleAddRecommendedToLibrary = async (bookId: string) => {
    if (isAdding || !selectedRecommendedBook) return;
    setIsAdding(true);
    try {
      const ownBooksList = await getOwnBooks();
      const isAlreadyInLibrary = ownBooksList.some(
        (book) =>
          book.title === selectedRecommendedBook.title &&
          book.author === selectedRecommendedBook.author
      );

      if (isAlreadyInLibrary) {
        toast.error('This book is already in your library');
        return;
      }

      await addRecommendedBook(bookId);
      setSelectedRecommendedBook(null);
      setIsGoodJobOpen(true);
      loadOwnBooks(selectedStatus);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.page}>
      <Dashboard>
        <AddBookForm onSubmit={handleAddBook} />
        <RecommendedBooksBlock
          books={recommendedBooks}
          onBookClick={handleRecommendedBookClick}
        />
      </Dashboard>

      <LibraryBooks
        books={ownBooks}
        onDelete={handleDelete}
        onOpenBook={handleOpenBook}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />

      <Modal isOpen={isGoodJobOpen} onClose={() => setIsGoodJobOpen(false)}>
        <GoodJobModal />
      </Modal>

      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
        {selectedBook && (
          <BookDetailsModal
            book={selectedBook}
            actionLabel="Start reading"
            onAction={handleStartReading}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!selectedRecommendedBook}
        onClose={() => setSelectedRecommendedBook(null)}
      >
        {selectedRecommendedBook && (
          <BookDetailsModal
            book={selectedRecommendedBook}
            actionLabel="Add to library"
            onAction={handleAddRecommendedToLibrary}
          />
        )}
      </Modal>
    </div>
  );
};
