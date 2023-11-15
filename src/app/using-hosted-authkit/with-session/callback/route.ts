import WorkOS from '@workos-inc/node';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '../auth';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code') || '';

  try {
    const { user } = await workos.users.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID || '',
      code,
    });

    // Create a JWT with the user's information
    // Here you might lookup and retrieve user details from your database
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(getJwtSecretKey());

    // Cleanup params
    url.searchParams.delete('code');

    // Store the session and redirect to the application
    url.pathname = '/using-hosted-authkit/with-session';
    const response = NextResponse.redirect(url);

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}
