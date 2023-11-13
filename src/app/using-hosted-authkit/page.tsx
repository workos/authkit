import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function UsingHostedAuthKit({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "user": null, "error": null }'));

  const authKitAuthorizationUrl = workos.sso.getAuthorizationURL({
    clientID: process.env.WORKOS_CLIENT_ID || '',
    provider: 'authkit',
    redirectURI: 'http://localhost:3000/using-hosted-authkit/callback',
  });

  return (
    <main>
      <h1>Using hosted AuthKit</h1>

      <form>
        <a href={authKitAuthorizationUrl}>Sign-in with AuthKit</a>
      </form>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
