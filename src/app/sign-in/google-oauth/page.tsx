import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function SignInWithGoogleOAuth({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "user": null, "error": null }'));

  const googleOAuthUrl = workos.sso.getAuthorizationURL({
    clientID: process.env.WORKOS_CLIENT_ID || '',
    provider: 'GoogleOAuth',
    redirectURI: 'http://localhost:3000/sign-in/google-oauth/callback',
  });

  return (
    <main>
      <h1>Sign-in</h1>
      <h2>Google OAuth</h2>

      <form>
        <a href={googleOAuthUrl}>Continue with Google</a>
      </form>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
