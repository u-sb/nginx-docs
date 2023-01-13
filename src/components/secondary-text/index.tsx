import styles from './index.module.css';

export default function SecondaryText({ children }: { children: string }) {
  return <small className={styles.secondary}>{children}</small>;
}
