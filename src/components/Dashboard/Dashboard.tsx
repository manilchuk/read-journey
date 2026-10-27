// src/components/Dashboard/Dashboard.tsx
import type { ReactNode } from 'react';
import styles from './Dashboard.module.css';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return <div className={styles.dashboard}>{children}</div>;
};
