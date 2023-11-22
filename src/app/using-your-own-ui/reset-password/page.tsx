'use client';

import { useFormState } from 'react-dom';
import { sendReset, resetPassword } from './reset-password';

export default function ResetPassword({ searchParams }: { searchParams: { token?: string } }) {
  const { token } = searchParams;

  // This example uses Next.js server actions to call functions on the server side.
  //
  // If your application is a single page app (SPA), you will need to:
  // - handle the form submission in `<form onSubmit>`
  // - make an API call to your backend (e.g using `fetch`)
  const [sendResetState, sendResetAction] = useFormState(sendReset, { error: null });
  const [resetPasswordState, resetPasswordAction] = useFormState(resetPassword, { error: null });

  if (!token) {
    return (
      <main key="email">
        <h1>Reset password</h1>

        <form action={sendResetAction}>
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
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            autoCapitalize="off"
            autoComplete="new-password"
            autoFocus
            required
          />
        </div>

        <input type="hidden" name="token" value={token} />

        {'user' in sendResetState && (
          // We also include the email in a hidden input so that password managers can update the password on the correct account.
          // https://developer.1password.com/docs/web/compatible-website-design/#password-change-and-reset-forms
          <input
            type="text"
            name="email"
            value={sendResetState.user.email}
            autoComplete="username"
            style={{ display: 'none' }}
          />
        )}

        <button type="submit">Continue</button>
      </form>

      <pre>{JSON.stringify(resetPasswordState, null, 2)}</pre>
    </main>
  );
}
