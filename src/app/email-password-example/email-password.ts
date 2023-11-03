'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  apiHostname: 'api.workos-test.com',
});

export async function authenticateWithPassword(prevState: any, formData: FormData) {
  try {
    return await workos.users.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  } catch (error) {
    return { error: error.rawData };
  }
}
