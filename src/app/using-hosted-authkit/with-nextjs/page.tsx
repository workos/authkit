import { redirect } from 'next/navigation';
import { getSignInUrl, signOut, withAuth } from '@workos-inc/authkit-nextjs';

export default async function WithNextjs() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  return (
    <main>
      <h1>Using hosted AuthKit</h1>
      <h2>With Next.js library</h2>
      {user ? (
        <>
          <p>Welcome back {user?.firstName && `, ${user?.firstName}`}</p>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        // `getSignInUrl` sets a PKCE cookie, so it has to run in a server action or
        // route handler. Cookies can no longer be written during a render in Next.js 16.
        <form
          action={async () => {
            'use server';
            redirect(await getSignInUrl());
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      )}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
