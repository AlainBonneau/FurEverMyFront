'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const center = {
  lat: 48.8566,
  lng: 2.3522,
};

const position = {
  lat: 48.9266,
  lng: 2.1953,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const GoogleMaps = () => {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center xl:w-1/2">
      <img
        className="mt-4 h-auto w-24 md:w-28 xl:w-24 2xl:w-44"
        src="/Questions-bro.png"
        alt="illustration localisation"
      />
      <h1
        className="mt-3 text-center text-4xl font-black text-black md:text-5xl"
        style={{ fontFamily: 'Poetsen One, sans-serif' }}
      >
        🚗 Où Nous Trouver 🚗
      </h1>

      {!googleMapsApiKey ? (
        <div className="mt-8 w-full rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
          Clé Google Maps manquante. Ajoute{' '}
          <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> dans
          l&apos;environnement.
        </div>
      ) : (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerClassName="mt-8 mb-8 h-[40vh] w-full rounded-xl md:h-[50vh] xl:h-[60vh] 2xl:h-[70vh]"
            center={center}
            zoom={10}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      )}
    </section>
  );
};

export default GoogleMaps;
