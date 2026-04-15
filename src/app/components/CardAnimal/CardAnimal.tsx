'use client';

import Link from 'next/link';

import { IAnimal } from '@/src/@types/animal';

interface CardAnimalProps {
  animal: IAnimal;
}

export default function CardAnimal({ animal }: CardAnimalProps) {
  return (
    <Link
      className="block w-[300px] overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      href={`/liste-des-animaux/${animal.id}`}
    >
      <img
        src={animal.avatar}
        alt={animal.name}
        className="h-[350px] w-full object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
        <b className="text-base text-slate-900">{animal.name}</b>
        <p className="text-slate-500">{animal.birthdate}</p>
      </div>
    </Link>
  );
}
