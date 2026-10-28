// src/pages/Library/LibraryPage.tsx
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddBookForm } from '@/components/AddBookForm/AddBookForm';
import { RecommendedBooksBlock } from '@/components/RecommendedBooksBlock/RecommendedBooksBlock';
import { LibraryBooks } from '@/components/LibraryBooks/LibraryBooks';
import styles from './LibraryPage.module.css';

export const LibraryPage = () => {
  const recommendedBooks = [
    {
      _id: '1',
      title: 'The Orphanage',
      author: 'Serhiy Zhadan',
      imageUrl:
        'https://res.cloudinary.com/drfvfno3o/image/upload/v1699726543/books/1.webp',
    },
    {
      _id: '2',
      title: 'Melodija kavi...',
      author: 'Natalia Gumytska',
      imageUrl:
        'https://res.cloudinary.com/drfvfno3o/image/upload/v1699726543/books/2.webp',
    },
    {
      _id: '3',
      title: 'Six doors',
      author: 'Irene Rozdobudko',
      imageUrl:
        'https://res.cloudinary.com/drfvfno3o/image/upload/v1699726543/books/3.webp',
    },
  ];

  return (
    <div className={styles.page}>
      <Dashboard>
        <AddBookForm onSubmit={(values) => console.log('Add book:', values)} />
        <RecommendedBooksBlock books={recommendedBooks} />
      </Dashboard>

      <LibraryBooks
        books={[]}
        onDelete={(id) => console.log('Delete:', id)}
        onOpenBook={(book) => console.log('Open:', book)}
      />
    </div>
  );
};
