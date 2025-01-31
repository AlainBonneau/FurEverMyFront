'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Image, { StaticImageData } from 'next/image';

import './Slider.scss';

type SliderProps = {
  imageUrls: StaticImageData[];
};

// eslint-disable-next-line import/prefer-default-export
export function Slider({ imageUrls }: SliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const firstImage = scrollContainerRef.current.querySelector('.imgSlider');
      if (firstImage) {
        setImageWidth(firstImage.clientWidth);
      }
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= imageWidth + 10;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += imageWidth + 10;
    }
  };

  return (
    <div className="slider">
      <button className="button btn1" type="button" onClick={scrollLeft}>
        <ArrowLeft />
      </button>
      <div className="scroll-container" ref={scrollContainerRef}>
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
