'use client';

import { useFormState } from 'react-dom';
import { sendMagicAuthCode, authenticateWithMagicAuth } from './magic-auth';

export default function MagicAuthExamplePage() {
  const [sendCodeState, sendCodeAction] = useFormState(sendMagicAuthCode, {});
  const [authenticateState, authenticateAction] = useFormState(authenticateWithMagicAuth, {});

  if (!sendCodeState.user) {
    return (
      <main key="email">
        <h1>Magic Auth example</h1>

        <form action={sendCodeAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <button type="submit">Send code</button>
        </form>

        <pre>{JSON.stringify(sendCodeState, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main key="code">
      <h1>Magic Auth example</h1>

      <form action={authenticateAction}>
        <div>
          <label htmlFor="code">Code</label>
          <input type="text" name="code" id="code" />
        </div>

        <input type="hidden" name="userId" value={sendCodeState.user.id} />

        <button type="submit">Sign in</button>
      </form>

      <pre>{JSON.stringify(authenticateState, null, 2)}</pre>
    </main>
  );
}
