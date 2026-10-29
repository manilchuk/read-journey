// src/components/GoodJobModal/GoodJobModal.tsx
import likeImage from '@/assets/images/modal/like.webp';
import styles from './GoodJobModal.module.css';

export const GoodJobModal = () => {
  return (
    <div className={styles.container}>
      <img src={likeImage} alt="Good job" className={styles.image} />
      <h2 className={styles.title}>Good job</h2>
      <p className={styles.text}>
        Your book is now in <strong>the library!</strong> The joy knows no
        bounds and now you can start your training
      </p>
    </div>
  );
};
