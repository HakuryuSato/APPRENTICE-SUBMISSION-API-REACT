import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomHead from './components/Layout/Head';
import Layout from './components/Layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conduit',
  description: 'A place to share your knowledge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <CustomHead />
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

