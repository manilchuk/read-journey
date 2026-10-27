// src/components/StartWorkoutBlock/StartWorkoutBlock.tsx
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import books from '@/assets/images/Recommendations/books.webp';
import styles from './StartWorkoutBlock.module.css';

export const StartWorkoutBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.workoutBlock}>
        <h2 className={styles.title}>Start your workout</h2>

        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <p className={styles.stepText}>
            <strong>Create a personal library:</strong> add the books you intend
            to read to it.
          </p>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <p className={styles.stepText}>
            <strong>Create your first workout:</strong> define a goal, choose a
            period, start training.
          </p>
        </div>

        <Link to="/library" className={styles.link}>
          My library <Icon name="icon-arrow-long-right" />
        </Link>
      </div>

      <div className={styles.quoteBlock}>
        <div className={styles.quoteIcon}>
          <img src={books} alt="" loading="lazy" />
        </div>
        <p className={styles.quoteText}>
          "Books are <strong>windows</strong> to the world, and reading is a
          journey into the unknown."
        </p>
      </div>
    </div>
  );
};
