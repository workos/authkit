import WorkOS from '@workos-inc/node';
import type { User } from '@workos-inc/node';
import Link from 'next/link';

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  apiHostname: 'api.workos-test.com',
});

export default async function UsersList({ searchParams }: { searchParams: { after?: string } }) {
  const usersList = await workos.users.listUsers({ after: searchParams.after });
  const { before, after } = usersList.listMetadata;

  return (
    <main>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Email</th>
            <th>Name</th>
            <th style={{ width: '10%', textAlign: 'right' }}>Verified</th>
          </tr>
        </thead>
        <tbody>
          {usersList.data.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{formatName(user)}</td>
              <td style={{ textAlign: 'right' }}>{user.emailVerified ? 'Yes' : 'No'}</td>
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
