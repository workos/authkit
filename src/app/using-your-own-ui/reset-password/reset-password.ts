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

export async function sendReset(prevState: any, formData: FormData) {
  try {
    return await workos.users.sendPasswordResetEmail({
      email: formData.get('email') as string,
      passwordResetUrl: 'http://localhost:3000/using-your-own-ui/reset-password',
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    return await workos.users.resetPassword({
      newPassword: formData.get('newPassword') as string,
      token: formData.get('token') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
