import Link from 'next/link';

export default function UsingHostedAuthKit() {
  return (
    <main>
      <h1>Using hosted AuthKit</h1>
      <ul>
        <li>
          <Link href="/using-hosted-authkit/basic">Basic example</Link>
        </li>
        <li>
          <Link href="/using-hosted-authkit/with-session">With session</Link>
        </li>
      </ul>
    </main>
  );
}
