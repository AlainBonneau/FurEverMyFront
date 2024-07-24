import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';

import NavBar from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';

import './styles/globals.css';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="fr">
        <body>
          <div id="page-container">
            <NavBar />
            <main id="content-wrap">{children}</main>
            <Footer />
          </div>          
        </body>
      </html>
    </StoreProvider>
  );
}
