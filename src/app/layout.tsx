import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Script from 'next/script'
import { Space_Grotesk, Space_Mono, Inter } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

import NavbarTitle from '../components/navbar/title'
import SBBlogLink from '../components/navbar/link'
import { CurrentYear } from '../components/current-year'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://n.wtf'),
  title: {
    default: 'N.WTF',
    template: '%s - N.WTF'
  },
  description: 'Open-source nginx Debian / Ubuntu repository, packed with latest features',
  openGraph: {
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
    card: 'summary_large_image'
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' }
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<NavbarTitle />}
              projectLink="https://github.com/u-sb/nginx-docs"
            >
              <SBBlogLink />
              <ThemeSwitch lite className="navbar-theme-switch" />
            </Navbar>
          }
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/u-sb/nginx-docs/tree/master"
          footer={
            <Footer>
              <p>
                MIT Licensed
                {' '}|{' '}
                Copyright &copy;
                {' '}
                2019
                {' '}-{' '}
                <CurrentYear defaultYear={2023} />
                {' '}
                <a href="https://m.ac/" target="_blank" rel="noopener external">m.ac</a>
              </p>
            </Footer>
          }
        >
          {children}
        </Layout>
        <Script
          defer
          data-domain="n.wtf"
          src="https://stat.u.sb/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
