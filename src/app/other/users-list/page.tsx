import WorkOS from '@workos-inc/node';
import type { User } from '@workos-inc/node';
import Link from 'next/link';
import { deleteUser } from './users-list';

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  apiHostname: 'api.workos-test.com',
});

export default async function UsersList({
  searchParams,
}: {
  searchParams: { before?: string; after?: string };
}) {
  const usersList = await workos.users.listUsers({ limit: 5, ...searchParams });
  const { before, after } = usersList.listMetadata;

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
          {usersList.data.map((user) => (
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
