import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import NavBar from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import './styles/globals.css';

interface Props {
  readonly children: ReactNode;
}

import AuthProvider from '@/src/app/components/AuthProvider/AuthProvider';

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>FurEverHome</title>
      </head>
      <body>
        <StoreProvider>
          <AuthProvider>
            <div id="page-container">
              <NavBar />
              <main id="content-wrap">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
