// src/app/layout.tsx
import './globals.css'; // seu CSS global
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bug Tracker Gamificado',
  description: 'Acompanhe e feche bugs de forma gamificada',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
