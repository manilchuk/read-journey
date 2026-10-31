// src/components/StatisticsBlock/StatisticsBlock.tsx
import { Icon } from '../Icon/Icon';
import styles from './StatisticsBlock.module.css';

interface StatisticsBlockProps {
  totalPages: number;
  readPages: number;
  onViewChange: (view: 'diary' | 'statistics') => void;
}

export const StatisticsBlock = ({
  totalPages,
  readPages,
  onViewChange,
}: StatisticsBlockProps) => {
  const percent = totalPages > 0 ? (readPages / totalPages) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Statistics</h2>
        <div className={styles.icons}>
          <button
            className={styles.iconBtn}
            onClick={() => onViewChange('diary')}
            aria-label="Show diary"
          >
            <Icon name="icon-stopwatch" className={styles.icon} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => onViewChange('statistics')}
            aria-label="Show statistics"
          >
            <Icon name="icon-chart" className={styles.iconActive} />
          </button>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <div className={styles.chart}>
          <svg className={styles.circle} viewBox="0 0 100 100">
            <circle
              className={styles.circleBg}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="6"
            />
            <circle
              className={styles.circleProgress}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - percent / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className={styles.percent}>{Math.round(percent)}%</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statDot} />
          <span className={styles.statValue}>{percent.toFixed(2)}%</span>
        </div>
        <p className={styles.statText}>{readPages} pages read</p>
      </div>
    </div>
  );
};
