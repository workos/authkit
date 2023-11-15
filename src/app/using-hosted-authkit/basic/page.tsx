import WorkOS from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function Basic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "error": null }'));

  const authKitUrl = workos.sso.getAuthorizationURL({
    clientID: process.env.WORKOS_CLIENT_ID || '',
    provider: 'authkit',
    redirectURI: 'http://localhost:3000/using-hosted-authkit/basic/callback',
  });

  return (
    <main>
      <h1>Using hosted AuthKit</h1>
      <h2>Basic example</h2>

      <form>
        <a href={authKitUrl}>Sign-in with AuthKit</a>
      </form>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
