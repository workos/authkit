'use client';

import { useFormState } from 'react-dom';
import { signIn } from './email-password';

export default function SignInWithEmailPassword() {
  // This example uses Next.js server actions to call functions on the server side.
  //
  // If your application is a single page app (SPA), you will need to:
  // - handle the form submission in `<form onSubmit>`
  // - make an API call to your backend (e.g using `fetch`)
  const [signInState, signInAction] = useFormState(signIn, { error: null });

  return (
    <main>
      <h1>Sign-in</h1>
      <h2>Email + Password</h2>

      <form action={signInAction}>
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
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoCapitalize="off"
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit">Sign-in</button>
      </form>

      <pre>{JSON.stringify(signInState, null, 2)}</pre>
    </main>
  );
}
