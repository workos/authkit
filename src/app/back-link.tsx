'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BackLink() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  if (segments.length === 1) return <Link href="/">Home</Link>;
  return <Link href={`/${segments[0]}`}>Examples</Link>;
}
