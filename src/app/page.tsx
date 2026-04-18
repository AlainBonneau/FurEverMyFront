import Image from 'next/image';

import image1 from 'public/img1.jpg';
import image2 from 'public/img2.jpg';
import image3 from 'public/img3.jpg';
import image4 from 'public/img4.jpg';
import image5 from 'public/img5.jpg';
import image6 from 'public/img6.jpg';
import image7 from 'public/img7.jpg';
import image8 from 'public/img8.jpg';
import image9 from 'public/img9.jpg';
import { Slider } from './components/Slider/Slider';

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
  return (
    <>
      <div className="mt-6 flex items-center justify-around px-4 sm:mt-10">
        <div className="group relative h-[110px] w-[110px] overflow-hidden rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl sm:h-[140px] sm:w-[140px] lg:h-[180px] lg:w-[180px]">
          <Image
            src="/Logo.png"
            alt="logo"
            fill
            sizes="(max-width: 640px) 110px, (max-width: 1024px) 140px, 180px"
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <section className="relative mx-auto mt-12 w-[90%] max-w-6xl rounded-2xl border-2 border-white bg-gradient-to-br from-[#003f3e] to-[#005a58] px-4 py-6 text-center shadow-2xl sm:mt-16 sm:px-8 sm:py-8">
        <img
          src="/AnimalImg.png"
          alt=""
          className="absolute right-4 top-4 w-20 transition-transform duration-300 hover:scale-110 hover:rotate-2 sm:right-8 sm:top-6 sm:w-28 lg:right-10 lg:w-40"
        />
        <h1
          className="text-4xl font-extrabold tracking-[0.2em] text-white drop-shadow md:text-6xl"
          style={{ fontFamily: 'Poetsen One, sans-serif' }}
        >
          FUR EVER HOME
        </h1>
        <p className="mt-3 text-base italic text-white sm:text-lg lg:text-xl">
          Bienvenue sur le site de notre refuge
        </p>
      </section>

      <Slider imageUrls={IMAGES} />

      {/* // TODO: Ajouter une section "À propos de nous" avec du texte et une image d'équipe. */}
    </>
  );
}

export default IndexPage;
