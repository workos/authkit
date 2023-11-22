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

export async function sendCode(prevState: any, formData: FormData) {
  try {
    const users = await workos.users.listUsers({ email: String(formData.get('email')) });
    const user = users.data[0];
    return await workos.users.sendVerificationEmail({ userId: user.id });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function verifyEmail(prevState: any, formData: FormData) {
  try {
    return await workos.users.verifyEmailCode({
      userId: String(formData.get('userId')),
      code: String(formData.get('code')),
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
