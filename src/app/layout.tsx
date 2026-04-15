import { ReactNode } from 'react';

import AuthProvider from './components/AuthProvider/AuthProvider';

import StoreProvider from './StoreProvider';
import { Footer } from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './styles/globals.css';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>FurEverHome</title>
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <StoreProvider>
          <AuthProvider>
            <div className="relative min-h-screen">
              <NavBar />
              <main className="pb-[15rem] pt-[54px] max-[767px]:pb-[17rem]">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
