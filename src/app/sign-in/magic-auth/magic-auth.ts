'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  apiHostname: 'api.workos-test.com',
});

export async function sendCode(prevState: any, formData: FormData) {
  try {
    return await workos.users.sendMagicAuthCode({
      email: formData.get('email') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function signIn(prevState: any, formData: FormData) {
  try {
    return await workos.users.authenticateWithMagicAuth({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      code: formData.get('code') as string,
      userId: formData.get('userId') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
