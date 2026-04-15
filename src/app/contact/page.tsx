'use client';

import React, { useState } from 'react';

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#00a292] focus:ring-2 focus:ring-[#00a292]/30';

function ContactForm() {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  return (
    <section className="mx-auto my-6 w-full max-w-3xl px-4 xl:max-w-xl">
      <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="pb-6 text-center text-4xl font-extrabold sm:text-5xl xl:text-4xl">
          Contact
        </h1>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="name-contact-form">
              Prénom
            </label>
            <input
              required
              placeholder="Prénom"
              type="text"
              className={inputClassName}
              id="name-contact-form"
              name="prenom"
              aria-label="Prénom"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="last-name-contact-form">
              Nom
            </label>
            <input
              required
              placeholder="Nom"
              type="text"
              className={inputClassName}
              id="last-name-contact-form"
              name="Nom"
              aria-label="Nom"
              value={lastNameValue}
              onChange={(e) => {
                setLastNameValue(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="email-contact-form">
              Email
            </label>
            <input
              required
              placeholder="Email"
              type="email"
              className={inputClassName}
              id="email-contact-form"
              name="email"
              aria-label="Email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600" htmlFor="message-contact-form">
              Message
            </label>
            <textarea
              id="message-contact-form"
              placeholder="Votre message ici.."
              className={`${inputClassName} min-h-36`}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex w-full justify-center">
          <button
            type="submit"
            className="rounded-lg border border-[#00a292] px-8 py-2 text-lg font-semibold text-[#006f64] transition hover:bg-[#00a292] hover:text-white"
          >
            Envoyer
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
