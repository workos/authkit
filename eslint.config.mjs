import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// `next lint` was removed in Next.js 16, and @next/eslint-plugin-next now
// defaults to ESLint's flat config format.
const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
];

export default config;
