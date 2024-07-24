import React from 'react';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Fur Ever Home</h3>
          <p>
            Votre refuge animalier dévoué à offrir une seconde chance aux
            animaux dans le besoin.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Fur Ever Home. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
