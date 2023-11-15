import WorkOS from '@workos-inc/node';
import { getUser, signOut } from './auth';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default async function WithSession() {
  const { isAuthenticated, user } = await getUser();

  const authKitUrl = workos.sso.getAuthorizationURL({
    clientID: process.env.WORKOS_CLIENT_ID || '',
    provider: 'authkit',
    redirectURI: 'http://localhost:3000/using-hosted-authkit/with-session/callback',
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
          <form>
            <a href={authKitUrl}>Sign-in</a>
          </form>
        </>
      )}

      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </main>
  );
}
