'use client';

import { useFormState } from 'react-dom';
import { signIn } from './email-password';

export default function SignInWithEmailPassword() {
  const [signInState, signInAction] = useFormState(signIn, {
    user: null,
    error: null,
  });

  return (
    <main>
      <h1>Sign-in</h1>
      <h2>Email + Password</h2>

      <form action={signInAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>

        <button type="submit">Sign-in</button>
      </form>

      <pre>{JSON.stringify(signInState, null, 2)}</pre>
    </main>
  );
}
