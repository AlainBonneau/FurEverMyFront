import React from 'react';

function About() {
  return (
    <section
      className="flex w-full max-w-5xl flex-col gap-5 rounded-xl bg-gradient-to-t from-[#06796b] to-[#efe6db] p-4 text-center text-white shadow-xl md:p-8 xl:w-1/2"
      style={{ fontFamily: 'Poetsen One, sans-serif' }}
    >
      <h1 className="text-3xl font-bold text-[#003f3e] md:text-4xl">
        🐶 À Propos de Fur Ever Home 🐶
      </h1>

      <img
        src="/AnimalShelter.png"
        alt="Refuge animalier Fur Ever Home"
        className="mx-auto h-auto w-full max-w-sm rounded-lg object-cover xl:h-[40vh]"
      />

      <p className="text-base leading-relaxed md:text-lg">
        Bienvenue chez <strong>Fur Ever Home</strong>, votre refuge animalier
        dévoué à offrir une seconde chance aux animaux dans le besoin. Notre
        mission est simple mais puissante : trouver des foyers aimants et
        permanents pour les animaux abandonnés et maltraités. Nous croyons
        fermement que chaque animal mérite une vie remplie d&apos;amour, de soins
        et de bonheur.
      </p>

      <h2 className="mt-4 text-2xl font-bold underline md:text-3xl">
        Notre Mission
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-left text-base md:text-lg">
        <li>
          <strong>Sauver</strong> les animaux en détresse, qu&apos;ils soient
          abandonnés, maltraités ou négligés.
        </li>
        <li>
          <strong>Soigner</strong> avec compassion en fournissant des soins
          vétérinaires de qualité, une alimentation adéquate et beaucoup
          d&apos;amour.
        </li>
        <li>
          <strong>Éduquer</strong> la communauté sur l&apos;importance de
          l&apos;adoption, de la stérilisation et de la vaccination des animaux.
        </li>
        <li>
          <strong>Placer</strong> chaque animal dans un foyer sûr et aimant où
          ils pourront s&apos;épanouir et être heureux.
        </li>
      </ul>

      <h2 className="mt-4 text-2xl font-bold underline md:text-3xl">
        Nos Services
      </h2>
      <p className="text-base leading-relaxed md:text-lg">
        Chez Fur Ever Home, nous offrons une gamme de services pour le bien-être
        de nos animaux :
      </p>
      <ul className="list-disc space-y-2 pl-6 text-left text-base md:text-lg">
        <li>
          <strong>Adoption</strong> : Nous aidons à trouver le match parfait
          entre nos animaux et leurs futurs propriétaires.
        </li>
        <li>
          <strong>Foster Care</strong> : Nous avons un programme de famille
          d&apos;accueil pour aider à préparer nos animaux à leur adoption
          définitive.
        </li>
        <li>
          <strong>Soins Vétérinaires</strong> : Nous assurons que tous nos
          animaux reçoivent les soins médicaux nécessaires avant leur adoption.
        </li>
        <li>
          <strong>Programmes de Sensibilisation</strong> : Nous organisons des
          ateliers et des événements pour sensibiliser le public à la cause
          animale.
        </li>
      </ul>

      <h2 className="mt-4 text-2xl font-bold underline md:text-3xl">
        Comment Vous Pouvez Aider
      </h2>
      <p className="text-base leading-relaxed md:text-lg">
        Il existe de nombreuses façons de soutenir Fur Ever Home :
      </p>
      <ul className="list-disc space-y-2 pl-6 text-left text-base md:text-lg">
        <li>
          <strong>Adoptez</strong> : Donnez une nouvelle vie à un animal en
          l&apos;accueillant dans votre foyer.
        </li>
        <li>
          <strong>Devenez Famille d&apos;Accueil</strong> : Aidez un animal à
          s&apos;adapter à la vie en famille en devenant famille d&apos;accueil
          temporaire.
        </li>
        <li>
          <strong>Faites un Don</strong> : Vos dons nous aident à couvrir les
          coûts de soins et à continuer notre mission de sauvetage.
        </li>
        <li>
          <strong>Bénévolat</strong> : Rejoignez notre équipe de bénévoles et
          aidez-nous dans nos tâches quotidiennes au refuge.
        </li>
      </ul>

      <p className="text-base leading-relaxed md:text-lg">
        Merci de votre intérêt et de votre soutien à Fur Ever Home. Ensemble,
        nous pouvons faire une différence dans la vie des animaux sans abri et
        leur offrir une chance de trouver leur &quot;fur ever home&quot;.
      </p>
    </section>
  );
}

export default About;
