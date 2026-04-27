'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { storeInvitationToken } from '@/lib/invitation-token';

/**
 * Client component that captures invitation_token from URL parameters
 * and stores it in a cookie for persistence across auth flows.
 * 
 * This ensures that if a user:
 * 1. Receives an invitation
 * 2. Clicks to accept but forgets their password
 * 3. Resets their password
 * 
 * The invitation token will still be available after password reset
 * to complete the invitation acceptance.
 */
export function InvitationTokenCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const invitationToken = searchParams.get('invitation_token');
    if (invitationToken) {
      storeInvitationToken(invitationToken);
    }
  }, [searchParams]);

  return null;
}
