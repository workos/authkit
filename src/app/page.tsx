import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link href="/using-your-own-ui">Using your own UI</Link>
        </li>
        <li>
          <Link href="/using-hosted-authkit">Using hosted AuthKit</Link>
        </li>
      </ul>
    </main>
  );
}
