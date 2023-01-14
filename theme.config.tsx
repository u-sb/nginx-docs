import { useRouter } from 'next/router';
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs';
import { useMemo } from 'react';
import { CurrentYear } from './src/components/current-year';
import NavbarTitle from './src/components/navbar/title';
import SBBlogLink from './src/components/navbar/link';

const config: DocsThemeConfig = {
  logo: (
    <NavbarTitle />
  ),
  docsRepositoryBase: 'https://github.com/u-sb/nginx-docs/tree/master',
  i18n: [],
  project: {
    link: 'https://github.com/u-sb/nginx-docs'
  },
  navbar: {
    extraContent: (
      <SBBlogLink />
    )
  },
  footer: {
    text: (
      <p>
        MIT Licensed
        {' '}|{' '}
        Copyright &copy;
        {' '}
        2019
        {' '}-{' '}
        <CurrentYear defaultYear={2023} />
        {' '}
        <a href="https://u.sb" target="_blank" rel="noopenner external noreferrer">SB Blog</a>
      </p>
    )
  },
  gitTimestamp() {
    return null;
  },
  // TODO: remove once https://github.com/shuding/nextra/issues/1210 is fixed
  toc: {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    extraContent: <></>
  },
  head() {
    // Custom <head /> goes here
    // const config = useConfig();
    // const { route } = useRouter();
    return (
      <>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
      </>
    );
  },
  useNextSeoProps() {
    const config = useConfig();
    const title = config.frontMatter.title ? `${config.frontMatter.title} - N.WTF` : 'N.WTF';
    const description = config.frontMatter.description ? config.frontMatter.description : 'Open-source nginx Debian / Ubuntu repository, packed with latest features';

    const { route } = useRouter();
    const canonical = useMemo(() => new URL(route.endsWith('/') ? route : `${route}/`, 'https://n.wtf').toString(), [route]);

    return {
      defaultTitle: 'N.WTF',
      title,
      description,
      canonical,
      openGraph: {
        url: canonical,
        title,
        siteName: 'N.WTF',
        images: [
          {
            url: '/android-chrome-512x512.png',
            type: 'image/png',
            width: 512,
            height: 512
          }
        ]
      },
      twitter: {
        cardType: 'summary_large_image'
      }
    };
  }
};

export default config;
