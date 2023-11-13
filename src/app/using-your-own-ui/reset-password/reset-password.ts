'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function sendReset(prevState: any, formData: FormData) {
  try {
    return await workos.users.sendPasswordResetEmail({
      email: formData.get('email') as string,
      passwordResetUrl: 'http://localhost:3000/using-your-own-ui/reset-password',
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    return await workos.users.resetPassword({
      newPassword: formData.get('newPassword') as string,
      token: formData.get('token') as string,
    });
  } catch (error) {
    console.log(error);
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
