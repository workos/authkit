'use server';

import WorkOS from '@workos-inc/node';
import type { AuthenticationResponse } from '@workos-inc/node';
import type { Factor, Challenge } from '@workos-inc/node/lib/mfa/interfaces';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function signIn(prevState: any, formData: FormData): Promise<SignInResponse> {
  try {
    return await workos.users.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  } catch (error) {
    const err = JSON.parse(JSON.stringify(error));

    if (err.rawData.code === 'mfa_enrollment') {
      const { authenticationFactor, authenticationChallenge } = await workos.users.enrollAuthFactor(
        {
          userId: err.rawData.user.id,
          type: 'totp',
          totpIssuer: 'WorkOS',
          totpUser: err.rawData.user.email,
        }
      );
      return {
        authenticationFactor,
        authenticationChallenge,
        pendingAuthenticationToken: err.rawData.pending_authentication_token,
      };
    }

    if (err.rawData.code === 'mfa_challenge') {
      const challenge = await workos.mfa.challengeFactor({
        authenticationFactorId: err.rawData.authentication_factors[0].id,
      });
      return {
        authenticationChallenge: challenge,
        pendingAuthenticationToken: err.rawData.pending_authentication_token,
      };
    }

    return { error: err };
  }
}

export async function verifyTotp(prevState: any, formData: FormData) {
  try {
    return await workos.users.authenticateWithTotp({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      authenticationChallengeId: formData.get('authenticationChallengeId') as string,
      pendingAuthenticationToken: formData.get('pendingAuthenticationToken') as string,
      code: formData.get('code') as string,
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}

type SignInResponse =
  | AuthenticationResponse
  | {
      authenticationFactor?: Factor;
      authenticationChallenge: Challenge;
      pendingAuthenticationToken: string;
    }
  | { error: any };
