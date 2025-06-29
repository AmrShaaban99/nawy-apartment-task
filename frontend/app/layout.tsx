import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApartmentProvider } from '@/contexts/ApartmentContext';
import { Header } from '@/components/organisms/Header';
import QueryProvider from './providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ApartmentFinder - Find Your Perfect Home',
  description: 'Discover amazing apartments and homes. Browse, filter, and find your perfect place to call home.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ApartmentProvider>
            <Header />
            <main>{children}</main>
          </ApartmentProvider>
        </QueryProvider>
      </body>
    </html>
  );
}