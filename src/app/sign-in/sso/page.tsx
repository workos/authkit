import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function SignInWithSSO({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "user": null, "error": null }'));

  const ssoUrl = workos.sso.getAuthorizationURL({
    clientID: process.env.WORKOS_CLIENT_ID || '',
    organization: process.env.SSO_ENABLED_ORGANIZATION_ID || '',
    redirectURI: 'http://localhost:3000/sign-in/sso/callback',
  });

  return (
    <main>
      <h1>Sign-in</h1>
      <h2>Single Sign-On</h2>

      <form>
        <a href={ssoUrl}>Continue with SSO</a>
      </form>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
