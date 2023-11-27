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
import { revalidatePath } from 'next/cache';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function deleteUser(formData: FormData) {
  try {
    await workos.userManagement.deleteUser(String(formData.get('userId')));
    revalidatePath('/users-table');
  } catch (error) {
    console.log(error);
  }
}
