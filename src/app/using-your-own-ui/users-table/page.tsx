import WorkOS from '@workos-inc/node';
import type { User } from '@workos-inc/node';
import Link from 'next/link';
import { deleteUser } from './users-table';

// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server, which allows
// us to use the WorkOS Node SDK without exposing our API key to the client.
//
// If your application is a single page app (SPA), you will need to:
// - create a backend endpoint to return the list of users
// - adapt the code below in your endpoint
// - make an API call to your backend (e.g using `fetch`)

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default async function UsersTable({
  searchParams,
}: {
  searchParams: { before?: string; after?: string };
}) {
  const users = await workos.users.listUsers({ limit: 5, ...searchParams });
  const { before, after } = users.listMetadata;

  return (
    <main>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Email</th>
            <th>Name</th>
            <th style={{ width: '10%', textAlign: 'center' }}>Verified</th>
            <th style={{ width: '10%', textAlign: 'right' }} />
          </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user.id}>
              <td title={user.id}>{user.email}</td>
              <td>{formatName(user)}</td>
              <td style={{ textAlign: 'center' }}>{user.emailVerified ? 'Yes' : 'No'}</td>
              <td style={{ textAlign: 'right' }}>
                <form action={deleteUser}>
                  <input type="hidden" name="userId" value={user.id} />
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        {before ? <Link href={`?before=${before}`}>Previous</Link> : 'Previous'}
        {after ? <Link href={`?after=${after}`}>Next</Link> : 'Next'}
      </nav>
    </main>
  );
}

function formatName(user: User) {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else {
    return user.lastName ?? user.firstName ?? '';
  }
}
