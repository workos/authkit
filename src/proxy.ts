// This file is only used in conjunction with the authkit-nextjs library.
// Next.js 16 renamed the `middleware` convention to `proxy`.
import { authkitProxy } from '@workos-inc/authkit-nextjs';

export default authkitProxy({ debug: true });

// Match against pages that require auth, e.g.:
export const config = { matcher: ['/using-hosted-authkit/with-nextjs'] };
