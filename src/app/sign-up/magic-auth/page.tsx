'use client';

import { useFormState } from 'react-dom';
import { signUp } from './magic-auth';

export default function SignUpWithMagicAuth() {
  const [signUpState, signUpAction] = useFormState(signUp, {
    user: null,
    error: null,
  });

  return (
    <main>
      <h1>Sign-up</h1>
      <h2>Magic Auth</h2>

      <form action={signUpAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="firstName" name="firstName" id="firstName" />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="lastName" name="lastName" id="lastName" />
        </div>

        <button type="submit">Sign up</button>
      </form>

      <pre>{JSON.stringify(signUpState, null, 2)}</pre>
    </main>
  );
}
