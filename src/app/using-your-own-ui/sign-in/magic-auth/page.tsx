'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { sendCode, signIn } from './magic-auth';

export default function SignInWithMagicAuth() {
  // This example uses Next.js server actions to call functions on the server side.
  //
  // If your application is a single page app (SPA), you will need to:
  // - handle the form submission in `<form onSubmit>`
  // - make an API call to your backend (e.g using `fetch`)
  const [sendCodeState, sendCodeAction] = useActionState(sendCode, { error: null });
  const [signInState, signInAction] = useActionState(signIn, { error: null });
  const [email, setEmail] = React.useState('');

  // Only the untouched initial state has `error: null`; a sent code resolves to a
  // `CreateMagicAuthResponse`, which has no `error` property at all.
  if ('error' in sendCodeState && sendCodeState.error === null) {
    return (
      <main key="email">
        <h1>Sign-in</h1>
        <h2>Magic Auth</h2>

        <form action={sendCodeAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoCapitalize="off"
              autoComplete="username"
              autoFocus
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button type="submit">Send code</button>
        </form>

        <pre>{JSON.stringify(sendCodeState, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main key="code">
      <h1>Sign-in</h1>
      <h2>Magic Auth</h2>

      <form action={signInAction}>
        <div>
          <label htmlFor="code">Enter code from the email</label>
          <input
            type="text"
            name="code"
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="^\d{6}$"
            autoFocus
            required
          />
        </div>

        {/* we need the email to authenticate with the code */}
        <input type="hidden" name="email" value={email} />

        <button type="submit">Sign-in</button>
      </form>

      <pre>{JSON.stringify(signInState, null, 2)}</pre>
    </main>
  );
}
