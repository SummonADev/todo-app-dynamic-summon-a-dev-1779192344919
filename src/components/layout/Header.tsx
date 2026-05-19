import { CheckCircle } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <CheckCircle className={styles.icon} />
        <h1>Momentum</h1>
      </div>
      <p className={styles.tagline}>Stay organized, stay focused.</p>
    </header>
  );
}