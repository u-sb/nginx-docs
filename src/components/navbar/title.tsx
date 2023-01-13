import styles from './title.module.css';

export default function NavbarTitle() {
  return (
    <>
      <span className={styles.title}>N.WTF</span>
      <span className={styles.second}>nginx with latest features</span>
    </>
  );
}
