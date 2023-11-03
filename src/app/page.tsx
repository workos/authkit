import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/email-password-example">Email + Password example</Link>
        </li>
        <li>
          <Link href="/magic-auth-example">Magic Auth example</Link>
        </li>
      </ul>
    </main>
  );
}
