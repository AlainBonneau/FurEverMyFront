'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';

import './page.scss';

function ContactForm() {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  return (
    <section className="contact-container">
      <h1 className="main-title">Contact</h1>

      <form action="get" className="form-container">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="Prénom"
          label="Prénom"
          type="text"
          className="input-field"
          id="name-contact-form"
          name="prenom"
          aria-label="Prénom"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="Nom"
          label="Nom"
          type="text"
          className="input-field"
          id="last-name-contact-form"
          name="Nom"
          aria-label="Nom"
          value={lastNameValue}
          onChange={(e) => {
            setLastNameValue(e.target.value);
          }}
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="Email"
          label="Email"
          type="text"
          className="input-field"
          id="email-contact-form"
          name="email"
          aria-label="Email"
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
        />
        <Textarea
          isReadOnly
          variant="bordered"
          labelPlacement="outside"
          placeholder="Votre message ici.."
          className="input-field"
        />
        <div className="button-container">
        <Button
          type="submit"
          variant="ghost"
          color="primary"
          size="lg"
          className="login-button"
        >
          Envoyer
        </Button>
        </div>
      </form>
    </section>
  );
}
export default ContactForm;
