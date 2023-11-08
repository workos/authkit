'use server';

import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function signUp(prevState: any, formData: FormData) {
  try {
    return await workos.users.createUser({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
