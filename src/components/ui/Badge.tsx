import styles from './Badge.module.css';
import { clsx } from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}