'use client';

import { useFormState } from 'react-dom';
import { sendCode, verifyEmail } from './verify-email';

export default function VerifyEmail() {
  // This example uses Next.js server actions to call functions on the server side.
  //
  // If your application is a single page app (SPA), you will need to:
  // - handle the form submission in `<form onSubmit>`
  // - make an API call to your backend (e.g using `fetch`)
  const [sendCodeState, sendCodeAction] = useFormState(sendCode, { error: null });
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, { error: null });

  if (!('user' in sendCodeState)) {
    return (
      <main key="email">
        <h1>Verify email</h1>

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
      <h1>Verify email</h1>

      <form action={verifyEmailAction}>
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

        <input type="hidden" name="userId" value={sendCodeState.user.id} />

        <button type="submit">Continue</button>
      </form>

      <pre>{JSON.stringify(verifyEmailState, null, 2)}</pre>
    </main>
  );
}
