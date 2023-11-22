'use server';

// These are Next.js server actions.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle each request
// - adapt the code below in each of those endpoints
//
// Please also note that for the sake of simplicity, we return all errors here.
// In a real application, you should pay attention to which errors make it
// to the client for security reasons.

import { WorkOS } from '@workos-inc/node';
import type { AuthenticationResponse } from '@workos-inc/node';
import type { Factor, Challenge } from '@workos-inc/node/lib/mfa/interfaces';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function signIn(prevState: any, formData: FormData): Promise<SignInResponse> {
  try {
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably store the user in a token (JWT)
    // and store that token in your DB or use cookies.
    return await workos.users.authenticateWithPassword({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      email: String(formData.get('email')),
      password: String(formData.get('password')),
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
    // For the sake of simplicity, we directly return the user here.
    // In a real application, you would probably store the user in a token (JWT)
    // and store that token in your DB or use cookies.
    return await workos.users.authenticateWithTotp({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      authenticationChallengeId: String(formData.get('authenticationChallengeId')),
      pendingAuthenticationToken: String(formData.get('pendingAuthenticationToken')),
      code: String(formData.get('code')),
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
