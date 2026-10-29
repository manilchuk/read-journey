// src/pages/Reading/ReadingPage.tsx
import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AddReadingForm } from '@/components/AddReadingForm/AddReadingForm';
import { ProgressBlock } from '@/components/ProgressBlock/ProgressBlock';
import { MyBook } from '@/components/MyBook/MyBook';
import styles from './ReadingPage.module.css';

// Тимчасові дані (потім замінимо на API)
const mockBook = {
  _id: '1',
  title: 'I See You Are Interested In The Dark',
  author: 'Hilarion Pavlyuk',
  imageUrl:
    'https://res.cloudinary.com/drfvfno3o/image/upload/v1699726543/books/1.webp',
};

export const ReadingPage = () => {
  const [isReading, setIsReading] = useState(false);

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
        title={mockBook.title}
        author={mockBook.author}
        imageUrl={mockBook.imageUrl}
        isReading={isReading}
        onToggleReading={handleToggleReading}
      />
    </div>
  );
};
