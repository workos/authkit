'use client';

import { useFormState } from 'react-dom';
import { sendReset, resetPassword } from './reset-password';

export default function ResetPassword({ searchParams }: { searchParams: { token?: string } }) {
  const { token } = searchParams;

  const [sendResetState, sendResetAction] = useFormState(sendReset, {
    user: null,
    error: null,
  });

  const [resetPasswordState, resetPasswordAction] = useFormState(resetPassword, {
    user: null,
    error: null,
  });

  if (!token) {
    return (
      <main key="email">
        <h1>Reset password</h1>

        <form action={sendResetAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>

          <button type="submit">Send reset instructions</button>
        </form>

        <pre>{JSON.stringify(sendResetState, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main key="code">
      <h1>Reset password</h1>

      <form action={resetPasswordAction}>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" name="newPassword" id="newPassword" required />
        </div>

        <input type="hidden" name="token" value={token} />

        <button type="submit">Continue</button>
      </form>

      <pre>{JSON.stringify(resetPasswordState, null, 2)}</pre>
    </main>
  );
}
