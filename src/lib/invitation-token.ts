'use server';

import { cookies } from 'next/headers';

const INVITATION_TOKEN_COOKIE = 'workos_invitation_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (invitation tokens expire in 6 days)

/**
 * Store the invitation token in a cookie.
 * This allows the token to persist across page navigations and auth flows
 * (e.g., when a user starts an invitation flow but then resets their password).
 */
export async function storeInvitationToken(token: string): Promise<void> {
  cookies().set(INVITATION_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

/**
 * Retrieve the stored invitation token from the cookie.
 * Returns undefined if no token is stored.
 */
export async function getStoredInvitationToken(): Promise<string | undefined> {
  return cookies().get(INVITATION_TOKEN_COOKIE)?.value;
}

/**
 * Clear the stored invitation token cookie.
 * Should be called after the invitation has been accepted or is no longer needed.
 */
export async function clearInvitationToken(): Promise<void> {
  cookies().delete(INVITATION_TOKEN_COOKIE);
}

/**
 * Get and clear the invitation token in one operation.
 * This is useful for consuming the token during authentication.
 */
export async function consumeInvitationToken(): Promise<string | undefined> {
  const token = await getStoredInvitationToken();
  if (token) {
    await clearInvitationToken();
  }
  return token;
}
