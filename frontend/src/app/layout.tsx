import './globals.css';
import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import AppShell from './components/AppShell';
import Providers from './Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  display: 'swap'
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--plex-mono-font',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Avante | Um passo de cada vez',
  description: 'Uma plataforma brasileira de planejamento e acompanhamento inteligente de estudos, com Avi, seu mentor de estudos.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
