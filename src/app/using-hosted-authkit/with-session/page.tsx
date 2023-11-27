import { WorkOS } from '@workos-inc/node';
import { getUser, signOut } from './auth';

// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server, which allows
// us to use the WorkOS Node SDK without exposing our API key to the client.
//
// If your application is a single page app (SPA), you will need to:
// - create a form that can POST to an endpoint in your backend
// - call the `getAuthorizationURL` method in that endpoint
// - redirect the user to the returned URL

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default async function WithSession() {
  const { isAuthenticated, user } = await getUser();

  const authKitUrl = workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID || '',
    provider: 'authkit',
    redirectUri: 'http://localhost:3000/using-hosted-authkit/with-session/callback',
  });

  return (
    <main>
      <h1>With session</h1>

      {isAuthenticated ? (
        <>
          <h2>Welcome back{user?.firstName && `, ${user?.firstName}`}</h2>
          <p>You are now authenticated into the application.</p>

          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign-out</button>
          </form>
        </>
      ) : (
        <>
          <h2>Sign-in</h2>
          <p>Sign-in to view your account details</p>
          <a href={authKitUrl}>Sign-in</a>
        </>
      )}

      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </main>
  );
}
