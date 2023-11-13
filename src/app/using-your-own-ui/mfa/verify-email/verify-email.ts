'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function sendCode(prevState: any, formData: FormData) {
  try {
    const users = await workos.users.listUsers({ email: formData.get('email') as string });
    const user = users.data[0];
    return await workos.users.sendVerificationEmail({ userId: user.id });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function verifyEmail(prevState: any, formData: FormData) {
  try {
    return await workos.users.verifyEmailCode({
      userId: formData.get('userId') as string,
      code: formData.get('code') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
