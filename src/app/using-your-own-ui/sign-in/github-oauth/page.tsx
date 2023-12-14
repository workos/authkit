import { WorkOS } from '@workos-inc/node';

// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server, which allows
// us to use the WorkOS Node SDK without exposing our API key to the client.
//
// If your application is a single page app (SPA), you will need to:
// - create a form that can POST to an endpoint in your backend
// - call the `getAuthorizationURL` method in that endpoint
// - redirect the user to the returned URL

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default function SignInWithGitHubOAuth({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const githubOAuthUrl = workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID || '',
    provider: 'GitHubOAuth',
    redirectUri: 'http://localhost:3000/using-your-own-ui/sign-in/github-oauth/callback',
  });

  const result = JSON.parse(String(searchParams.response ?? '{ "error": null }'));

  return (
    <main>
      <h1>Sign-in</h1>
      <h2>GitHub OAuth</h2>
      <a href={githubOAuthUrl}>Continue with GitHub</a>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
