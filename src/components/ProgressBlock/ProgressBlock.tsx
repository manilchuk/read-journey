// src/components/ProgressBlock/ProgressBlock.tsx
import starImage from '@/assets/images/modal/star.webp';
import styles from './ProgressBlock.module.css';

export const ProgressBlock = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Progress</h2>
      <p className={styles.text}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className={styles.iconWrapper}>
        <img src={starImage} alt="Progress" className={styles.icon} />
      </div>
    </div>
  );
};
