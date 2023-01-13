import Image from 'next/image';
import nwtfLogo from '../../../public/android-chrome-512x512.png';

import styles from './index.module.css';
import Link from 'next/link';
import { clsx } from 'clsx';

const features = [
  {
    name: 'Up-to-date',
    text: 'We release latest mainline branch from nginx official source code.'
  },
  {
    name: 'TLS 1.3',
    text: 'We packed OpenSSL 3.0.x into our nginx as standard.'
  },
  {
    name: 'Modules',
    text: 'Brotli compression, GeoIP2 and more.'
  }
];

export default function HomePage() {
  return (
    <>
      <header className={styles.hero}>
        <Image
          className={styles.logo}
          src={nwtfLogo}
          priority
          alt="Logo"
        />
        <h1 className={styles.title}>N.WTF</h1>
        <p className={styles.description}>
          Open-source nginx Debian / Ubuntu repository
        </p>
        <div className={styles.actions}>
          <Link href="/intro/" className={clsx(styles.button, styles.button_primary)}>
            Getting Started
          </Link>
          <Link href="/install/" className={clsx(styles.button, styles.button_secondary)}>
            Install
          </Link>
        </div>
      </header>
      <div className={styles.features}>
        {features.map(feature => (
          <div key={feature.name} className={styles.feature}>
            <h2>{feature.name}</h2>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
