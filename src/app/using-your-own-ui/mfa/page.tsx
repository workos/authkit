'use client';

import { useFormState } from 'react-dom';
import { signIn, verifyTotp } from './mfa';
import Image from 'next/image';

export default function Mfa() {
  const [signInState, signInAction] = useFormState(signIn, { error: null });
  const [verifyState, verifyAction] = useFormState(verifyTotp, { error: null });

  if (!('authenticationChallenge' in signInState) || 'user' in signInState) {
    return (
      <main key="sign-in">
        <h1>Multi-Factor Auth</h1>
        <h2>Sign-in</h2>

        <form action={signInAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" autoFocus required />
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

  return (
    <main key="mfa">
      <h1>Multi-Factor Auth</h1>

      {signInState.authenticationFactor ? (
        <>
          <h2>Enroll</h2>
          <p>Scan the QR code</p>
          <Image
            src={signInState.authenticationFactor.totp!.qrCode}
            width="160"
            height="160"
            alt="QR code"
          />
          <p>then</p>
        </>
      ) : (
        <h2>Verify</h2>
      )}

      <form action={verifyAction}>
        <div>
          <label htmlFor="code">Enter the code from your app</label>
          <input name="code" id="code" autoFocus required />
        </div>

        <input
          type="hidden"
          name="authenticationChallengeId"
          value={signInState.authenticationChallenge.id}
        />

        <input
          type="hidden"
          name="pendingAuthenticationToken"
          value={signInState.pendingAuthenticationToken}
        />

        <button type="submit">Continue</button>
      </form>

      <pre>{JSON.stringify(verifyState, null, 2)}</pre>
    </main>
  );
}
