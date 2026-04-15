'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowLeft, ArrowRight } from 'react-feather';

type SliderProps = {
  imageUrls: StaticImageData[];
};

// eslint-disable-next-line import/prefer-default-export
export function Slider({ imageUrls }: SliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const firstImage = scrollContainerRef.current.querySelector('.img-slider');
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
    <section className="mx-auto mt-8 flex w-full max-w-[2000px] items-center px-2 max-[600px]:flex-col sm:px-4">
      <button
        className="z-10 rounded-full border-4 border-white bg-[#02312c80] p-2 text-white transition duration-300 hover:scale-110 hover:bg-[#003f3e] sm:p-3 lg:p-4"
        type="button"
        onClick={scrollLeft}
        aria-label="Image précédente"
      >
        <ArrowLeft />
      </button>

      <div
        className="mx-2 flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[600px]:mx-4 max-[600px]:my-4"
        ref={scrollContainerRef}
      >
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            className="img-slider mt-4 h-[40vh] w-full flex-none snap-center rounded-xl object-cover sm:h-[50vh] lg:h-[60vh] xl:h-[70vh]"
            src={imageUrl}
            alt={`Image ${index + 1}`}
            sizes="100vw"
            priority={index < 2}
          />
        ))}
      </div>

      <button
        className="z-10 rounded-full border-4 border-white bg-[#02312c80] p-2 text-white transition duration-300 hover:scale-110 hover:bg-[#003f3e] sm:p-3 lg:p-4"
        type="button"
        onClick={scrollRight}
        aria-label="Image suivante"
      >
        <ArrowRight />
      </button>
    </section>
  );
}
