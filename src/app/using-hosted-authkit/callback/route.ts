import WorkOS from '@workos-inc/node';
import { redirect } from 'next/navigation';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code') || '';

  let response;

  try {
    response = await workos.users.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      code,
    });
  } catch (error) {
    response = error;
  }

  if (response) {
    redirect(`http://localhost:3000/using-hosted-authkit?response=${JSON.stringify(response)}`);
  }
}
