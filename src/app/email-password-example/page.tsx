'use client';

import { useFormState } from 'react-dom';
import { authenticateWithPassword } from './email-password';

export default function EmailPasswordExamplePage() {
  const [authenticateState, authenticateAction] = useFormState(authenticateWithPassword, {
    user: null,
    error: null,
  });

  return (
    <main>
      <h1>Email + Password</h1>

      <form action={authenticateAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>

        <button type="submit">Sign in</button>
      </form>

      <pre>{JSON.stringify(authenticateState, null, 2)}</pre>
    </main>
  );
}
