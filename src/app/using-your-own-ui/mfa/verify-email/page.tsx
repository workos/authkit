'use client';

import { useFormState } from 'react-dom';
import { sendCode, verifyEmail } from './verify-email';

export default function VerifyEmail() {
  const [sendCodeState, sendCodeAction] = useFormState(sendCode, {
    user: null,
    error: null,
  });

  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, {
    user: null,
    error: null,
  });

  if (!sendCodeState.user) {
    return (
      <main key="email">
        <h1>Verify email</h1>

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
      <h1>Verify email</h1>

      <form action={verifyEmailAction}>
        <div>
          <label htmlFor="code">Enter code from the email</label>
          <input type="text" name="code" id="code" autoFocus required />
        </div>

        <input type="hidden" name="userId" value={sendCodeState.user.id} />

        <button type="submit">Continue</button>
      </form>

      <pre>{JSON.stringify(verifyEmailState, null, 2)}</pre>
    </main>
  );
}
