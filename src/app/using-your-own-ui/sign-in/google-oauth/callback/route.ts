import { WorkOS } from '@workos-inc/node';
import { redirect } from 'next/navigation';

// This is a Next.js Route Handler.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle the request
// - adapt the code below in your endpoint
//
// Please also note that for the sake of simplicity, we directly return the user here in the query string.
// In a real application, you would probably store the user in a token (JWT)
// and store that token in your DB or use cookies.

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code') || '';

  let response;

  try {
    response = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      code,
    });
  } catch (error) {
    response = error;
  }

  if (response) {
    redirect(
      `http://localhost:3000/using-your-own-ui/sign-in/google-oauth?response=${JSON.stringify(
        response
      )}`
    );
  }
}
