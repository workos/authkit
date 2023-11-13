'use client';

import { useFormState } from 'react-dom';
import { sendCode, signIn } from './magic-auth';

export default function SignInWithMagicAuth() {
  const [sendCodeState, sendCodeAction] = useFormState(sendCode, {
    user: null,
    error: null,
  });

  const [signInState, signInAction] = useFormState(signIn, {
    user: null,
    error: null,
  });

  if (!sendCodeState.user) {
    return (
      <main key="email">
        <h1>Sign-in</h1>
        <h2>Magic Auth</h2>

        <form action={sendCodeAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" autoFocus required />
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
          <input type="text" name="code" id="code" autoFocus required />
        </div>

        <input type="hidden" name="userId" value={sendCodeState.user.id} />

        <button type="submit">Sign-in</button>
      </form>

      <pre>{JSON.stringify(signInState, null, 2)}</pre>
    </main>
  );
}
