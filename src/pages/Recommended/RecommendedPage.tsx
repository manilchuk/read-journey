// src/pages/Recommended/RecommendedPage.tsx
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { Filters } from '@/components/Filters/Filters';
import { StartWorkoutBlock } from '@/components/StartWorkoutBlock/StartWorkoutBlock';
import styles from './RecommendedPage.module.css';

export const RecommendedPage = () => {
  const handleFilterSubmit = (title: string, author: string) => {
    console.log('Filters:', title, author);
  };

  return (
    <div className={styles.page}>
      <Dashboard>
        <Filters onSubmit={handleFilterSubmit} />
        <StartWorkoutBlock />
      </Dashboard>

      <div className={styles.mainContent}>
        <h1 className={styles.title}>Recommended</h1>
        <div className={styles.placeholder}>Books grid will be here</div>
      </div>
    </div>
  );
};
