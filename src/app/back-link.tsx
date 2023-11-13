'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackLink() {
  const pathname = usePathname();
  switch (pathname) {
    case '/':
      return null;
    case '/using-your-own-ui':
    case '/using-hosted-authkit':
      return <Link href="/">Home</Link>;
    default:
      return <Link href="/using-your-own-ui">Examples</Link>;
  }
}
