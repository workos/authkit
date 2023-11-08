'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function signIn(prevState: any, formData: FormData) {
  try {
    return await workos.users.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
