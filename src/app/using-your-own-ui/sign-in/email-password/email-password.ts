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

export async function signIn(prevState: any, formData: FormData) {
  try {
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably store the user in a token (JWT)
    // and store that token in your DB or use cookies.
    return await workos.users.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
