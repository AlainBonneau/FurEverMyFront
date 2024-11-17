'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './GoogleMap.scss';

const center = {
  lat: 48.8566, // Latitude
  lng: 2.3522, // Longitude
};

// Position du marqueur sur la carte (à Paris)
const position = {
  lat: 48.9266,
  lng: 2.1953,
};

// Composant GoogleMaps
const GoogleMaps = () => {
  return (
    <>

      <div>
        <img className="img-title" src="/Questions-bro.png" alt="" />
        <h1 className="map-title"> 🚗Où Nous Trouver🚗</h1>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyDnEkjYkaAkVrNNzQ5ZU9Y3lU0LVNF6rBM">
        <GoogleMap
          mapContainerClassName="map-container"
          center={center} // Centre de la carte
          zoom={10} // Niveau de zoom de la carte
        >
          {/* Marqueur sur la carte */}
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMaps;
