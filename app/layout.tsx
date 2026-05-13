import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '800'] });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700', '800'] });
const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari', weight: ['400', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Sampurna Samruddhi — Daily Wisdom with Ease',
  description: 'Free daily wisdom in English, Hindi, and Marathi across health, wealth, relationships, career, and spirituality.',
  applicationName: 'Sampurna Samruddhi',
  metadataBase: new URL('https://fabselfhelp.com'),
  openGraph: {
    title: 'Sampurna Samruddhi — Daily Wisdom with Ease',
    description: 'A mobile-first free wisdom library by Samruddhi Upasana Team.',
    siteName: 'Sampurna Samruddhi',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f6eddc',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
