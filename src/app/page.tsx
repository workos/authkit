import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link href="/email-password-example">Email + Password</Link>
        </li>
        <li>
          <Link href="/magic-auth-example">Magic Auth</Link>
        </li>
      </ul>
    </main>
  );
}
