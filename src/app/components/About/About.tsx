import React from 'react';
import './About.scss';

function About() {
  return (
    <div className="about-us">
      <h1>À Propos de Fur Ever Home 🐶 </h1>
      <img src="/AnimalShelter.png" alt="" />
      <p>
        Bienvenue chez <strong>Fur Ever Home</strong>, votre refuge animalier
        dévoué à offrir une seconde chance aux animaux dans le besoin. Notre
        mission est simple mais puissante : trouver des foyers aimants et
        permanents pour les animaux abandonnés et maltraités. Nous croyons
        fermement que chaque animal mérite une vie remplie d&apos;amour, de
        soins et de bonheur.
      </p>
      <h2>Notre Mission</h2>
      <ul>
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
      <h2>Nos Services</h2>
      <p>
        Chez Fur Ever Home, nous offrons une gamme de services pour le bien-être
        de nos animaux :
      </p>
      <ul>
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
      <h2>Comment Vous Pouvez Aider</h2>
      <p>Il existe de nombreuses façons de soutenir Fur Ever Home :</p>
      <ul>
        <li>
          <strong>Adoptez</strong> : Donnez une nouvelle vie à un animal en
          l&apos;accueillant dans votre foyer.
        </li>
        <li>
          <strong>Devenez Famille d’Accueil</strong> : Aidez un animal à
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
      <p>
        Merci de votre intérêt et de votre soutien à Fur Ever Home. Ensemble,
        nous pouvons faire une différence dans la vie des animaux sans abri et
        leur offrir une chance de trouver leur &quot;fur ever home&quot;.
      </p>
    </div>
  );
}
export default About;
