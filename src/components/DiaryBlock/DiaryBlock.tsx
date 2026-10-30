// src/components/DiaryBlock/DiaryBlock.tsx
import { Icon } from '../Icon/Icon';
import type { ReadingProgress } from '@/types';
import styles from './DiaryBlock.module.css';

interface DiaryBlockProps {
  progress: ReadingProgress[];
  onDelete: (readingId: string) => void;
}

export const DiaryBlock = ({ progress, onDelete }: DiaryBlockProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Diary</h2>
        <div className={styles.icons}>
          <Icon name="icon-stopwatch" className={styles.icon} />
          <Icon name="icon-chart" className={styles.icon} />
        </div>
      </div>

      <div className={styles.list}>
        {progress.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <div className={styles.entryHeader}>
              <div className={styles.dateWrapper}>
                <div className={styles.checkbox} />
                <span className={styles.date}>
                  {new Date(entry.startReading).toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <span className={styles.pages}>
                {entry.finishPage && entry.startPage
                  ? entry.finishPage - entry.startPage
                  : 0}{' '}
                pages
              </span>
            </div>

            <div className={styles.entryBody}>
              <div className={styles.stat}>
                <span className={styles.percent}>
                  {entry.finishPage && entry.startPage
                    ? ((entry.finishPage - entry.startPage) / 100).toFixed(1)
                    : 0}
                  %
                </span>
                <span className={styles.time}>
                  {entry.startReading && entry.finishReading
                    ? Math.round(
                        (new Date(entry.finishReading).getTime() -
                          new Date(entry.startReading).getTime()) /
                          60000
                      )
                    : 0}{' '}
                  minutes
                </span>
              </div>

              <div className={styles.speed}>
                <div className={styles.speedLine} />
                <span className={styles.speedText}>
                  {entry.speed || 0} pages per hour
                </span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(entry.startReading)}
                aria-label="Delete entry"
              >
                <Icon name="icon-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
