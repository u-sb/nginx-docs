import Script from 'next/script';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  if ('statusCode' in pageProps && pageProps.statusCode === 404) {
    return (
      <Component {...pageProps} />
    );
  }
  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'production' && (
        <Script
          data-domain="n.wtf"
          src="https://stat.u.sb/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

export default MyApp;
