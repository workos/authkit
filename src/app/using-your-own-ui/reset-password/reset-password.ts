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
    const email = String(formData.get('email'));
    return await workos.userManagement.sendPasswordResetEmail({
      email,
      passwordResetUrl: `http://localhost:3000/using-your-own-ui/reset-password?email=${email}`,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    return await workos.userManagement.resetPassword({
      newPassword: String(formData.get('newPassword')),
      token: String(formData.get('token')),
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
