'use server';

import WorkOS from '@workos-inc/node';
import { revalidatePath } from 'next/cache';

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  apiHostname: 'api.workos-test.com',
});

export async function deleteUser(formData: FormData) {
  try {
    await workos.users.deleteUser({
      userId: formData.get('userId') as string,
    });
    revalidatePath('/users-table');
  } catch (error) {
    console.log(error);
  }
}
