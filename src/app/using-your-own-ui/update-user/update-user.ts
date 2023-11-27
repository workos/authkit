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
import { revalidatePath } from 'next/cache';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function getUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const users = await workos.userManagement.listUsers({ email: String(formData.get('email')) });
    const user = users.data[0];
    return { user };
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function updateUser(prevState: any, formData: FormData): Promise<Response> {
  try {
    const user = await workos.userManagement.updateUser({
      userId: String(formData.get('userId')),
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
    });
    revalidatePath('/users-table');
    return { user };
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

type Response = { user: User } | { error: any };
