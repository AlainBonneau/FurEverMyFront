'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Image,{ StaticImageData } from 'next/image';

import './Slider.scss';

type SliderProps = {
  imageUrls: StaticImageData[];
};


// eslint-disable-next-line import/prefer-default-export
export function Slider({ imageUrls }: SliderProps) {
  // Utilisation de useRef pour obtenir une référence au conteneur défilable
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);

  // Utilisez useEffect pour obtenir la largeur de la première image une fois que le composant est monté
  useEffect(() => {
    if (scrollContainerRef.current) {

      // Obtenir la première image dans le conteneur
      const firstImage = scrollContainerRef.current.querySelector('.imgSlider');
      if (firstImage) {
        setImageWidth(firstImage.clientWidth);
      }
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Défile de la largeur d'une image vers la gauche
      scrollContainerRef.current.scrollLeft -= imageWidth;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
            // Défile de la largeur d'une image vers la droite
      scrollContainerRef.current.scrollLeft += imageWidth;
    }
  };

  return (
    <div className="slider">
      <button className="button btn1" type="button" onClick={scrollLeft}>
        <ArrowLeft />
      </button>
      <div className="scroll-container" ref={scrollContainerRef}>
        {/* Mappage des URLs des images pour les afficher */}
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={index} 
            className="imgSlider"
            src={imageUrl}
            alt={`Image ${index}`}
          />
          
        ))}
      </div>
      <button className="button btn2" type="button" onClick={scrollRight}>
        <ArrowRight />
      </button>
    </div>
  );
}
