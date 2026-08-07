'use server';

// These are Next.js server actions.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle each request
// - adapt the code below in each of those endpoints
//
// Please also note that for the sake of simplicity, we return all errors here.
// In a real application, you should pay attention to which errors make it
// to the client for security reasons.

import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

// `sendMagicAuthCode` was replaced by `createMagicAuth`. WorkOS still emails the code; what
// changed is that the new method also *returns* it.
//
// Never pass that code back to the caller. Anyone can submit anyone else's address here, so
// returning it would let a stranger sign in as them. Receiving the email is precisely what
// proves the person owns the address, so the code must only ever travel that way.
export async function sendCode(prevState: any, formData: FormData) {
  try {
    await workos.userManagement.createMagicAuth({
      email: String(formData.get('email')),
    });
  } catch (error) {
    // Logged server-side only: a distinguishable response would reveal which addresses
    // have accounts.
    console.error('[example] Could not create a Magic Auth code:', error);
  }

  // Deliberately identical whether or not that address has an account.
  return { submitted: true };
}

export async function signIn(prevState: any, formData: FormData) {
  try {
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably store the user in a token (JWT)
    // and store that token in your DB or use cookies.
    return await workos.userManagement.authenticateWithMagicAuth({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      code: String(formData.get('code')),
      email: String(formData.get('email')),
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
