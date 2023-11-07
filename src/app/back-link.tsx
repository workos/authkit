'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackLink() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Link href="/">Examples</Link>;
}
