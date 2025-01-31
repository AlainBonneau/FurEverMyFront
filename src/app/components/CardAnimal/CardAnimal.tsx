'use client';

import { Card, CardBody, CardFooter, Image} from '@nextui-org/react';

import './CardAnimal.scss';
import { IAnimal } from '@/src/@types/animal';
import Link from 'next/link';


interface CardAnimalProps {
  animal: IAnimal;
}

export default function CardAnimal({ animal }: CardAnimalProps) {
  return (
    <Link className="animal-id" href={`/liste-des-animaux/${animal.id}`}>
    <Card
      shadow="sm"
      isPressable
      className="w-[300px] aspect-[3/4]"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          shadow="sm"
          radius="none"
          width="100%"
          alt={animal.name}
          className="h-[350px] object-cover"
          src={animal.avatar}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{animal.name}</b>
        <p className="text-default-500">{`${animal.birthdate}`}</p>
        </CardFooter>
    </Card>
    </Link>
  );
}
