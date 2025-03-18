'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import { useAppDispatch } from '../lib/hooks';

import About from './components/About/About';
import GoogleMaps from './components/GoogleMap/GoogleMap';
import { Slider } from './components/Slider/Slider';
import image1 from 'public/img1.jpg';
import image2 from 'public/img2.jpg';
import image3 from 'public/img3.jpg';
import image4 from 'public/img4.jpg';
import image5 from 'public/img5.jpg';
import image6 from 'public/img6.jpg';
import image7 from 'public/img7.jpg';
import image8 from 'public/img8.jpg';
import image9 from 'public/img9.jpg';
import './page.scss';
import { getFromSessionStorage } from '../sessionStorage/sessionStorage';
import { addTokenJwtToAxiosInstance } from '../lib/axios/axios';
import {
  actionSetConnectedUser,
  actionSetToken,
} from '../lib/actions/auth.action';
import { getFromLocalStorage } from '../localstorage/localStorage';

const IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

function IndexPage() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const token = getFromSessionStorage() || getFromLocalStorage();
  //   if (token) {
  //     addTokenJwtToAxiosInstance(token);
  //     const arrayToken = token.split('.');
  //     const tokenPayload = JSON.parse(atob(arrayToken[1]));
  //     dispatch(actionSetConnectedUser(tokenPayload));
  //   }
  // }, [dispatch]);

  return (
    <>
      <div className="logo-container">
      <div className="logo">
        <Image
          src="/Logo.png"
          alt="logo"
          width={200}
          height={500}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            left: '20px',
          }}
        />
      </div>
      <div className="logo">
        <Image
          src="/Logo.png"
          alt="logo"
          width={200}
          height={500}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            left: '20px',
          }}
        />
      </div>
      </div>
      <div className="title">
        <img src="/AnimalImg.png" alt="" />
        <h1>FUR EVER HOME</h1>
        <p>Bienvenue sur le site de notre refuge</p>
      </div>

      <Slider imageUrls={IMAGES} />
      <div className="about-container">
        <About />
        <GoogleMaps />
      </div>
    </>
  );
}

export default IndexPage;
