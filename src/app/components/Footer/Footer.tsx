import React from 'react';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-[#02564c] text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-6 text-center md:px-6">
        <div className="w-full">
          <h3 className="text-xl font-semibold md:text-2xl">Fur Ever Home</h3>
          <p className="mt-2 text-sm md:text-base">
            Votre refuge animalier dévoué à offrir une seconde chance aux
            animaux dans le besoin.
          </p>
        </div>
      </div>
      <div className="border-t border-white/30 px-4 py-3 text-center text-xs sm:text-sm">
        <p>&copy; 2024 Fur Ever Home. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
