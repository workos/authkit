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

export async function signUp(prevState: any, formData: FormData) {
  try {
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably redirect the user to sign-in.
    return await workos.userManagement.createUser({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
