
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 
});

export const metadata = {
  title: {
    default: 'Bug Tracker Gamificado',
    template: '%s | Bug Tracker' 
  },
  description: 'Acompanhe e feche bugs de forma gamificada',
  keywords: ['bugs', 'gamificação', 'produtividade', 'desenvolvimento'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* 👆 BG padrão e altura mínima */}
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}