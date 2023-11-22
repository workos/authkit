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
import type { User } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function getUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const users = await workos.users.listUsers({ email: formData.get('email') as string });
    const user = users.data[0];
    return { user };
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function updateUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const user = await workos.users.updateUser({
      userId: formData.get('userId') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
    });
    return { user };
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

type Response = { user: User } | { error: any };
