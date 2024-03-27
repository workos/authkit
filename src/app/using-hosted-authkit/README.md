<p align="center">
    <img src="https://github.com/workos/authkit/assets/896475/9fa7a91e-f5a8-4922-96fb-20a7b478d075" width="72" />
    <h1 align="center">Using AuthKit's hosted UI</h1>
    <p align="center">How to use AuthKit with themeable hosted UI</p>
    <p align="center"><strong><a href="#examples">View the examples</a></strong>&nbsp;&nbsp;·&nbsp;&nbsp;<strong><a href="https://workos.com/docs/user-management">Explore the docs ↗</a></strong></p>
    <br><br><br>
</p>

## Setup

First, ensure you have set up the [environment variables](/#environment-variables) and [redirects](/#redirects).

For each example, you will need to ensure the applicable authentication method is enabled in your WorkOS dashboard. To do so navigate to **Authentication** and edit the applicable authentication method and ensure it is set to **Enabled**.

For the Google OAuth and Microsoft OAuth examples, WorkOS provides demo app credentials to use in your WorkOS staging environment. This allows you to test these authentication flows without having to set up your own OAuth apps.

In order to test Single Sign-On, you will need to create an organization in your WorkOS dashboard. Navigate to **Organizations** and then **Create organization**. Enter a name for this organization, and optionally add a domain that the members will use to sign in. You will also need to create a Single Sign-On connection in the WorkOS dashboard for this organization. On this organization's detail page, navigate to the authentication section, find **Single Sign-On**. For the purposes of this example, we will use the **Configure Manually** feature to create a new connection. This requires you to have access to an identity provider (IdP) for testing such as Entra ID (Azure AD), Google Workspace, or Okta.

## Examples

- [Basic authentication](./basic/page.tsx). How to use AuthKit's hosted UI with any authentication method (Email + Password, Magic Auth, Google OAuth, Microsoft OAuth, and Single Sign-On).
- [Using the authkit-nextjs library](./with-nextjs/page.tsx). How to use AuthKit's hosted UI in Next.js with managed client-side sessions and impersonation.
- [With client-side sessions](./with-session/page.tsx). How to use AuthKit's hosted UI and manage sessions client-side using JavaScript Web Tokens (JWTs).

### Next.js

For the `authkit-nextjs` example, you'll need to add the following to your environment variables:

```bash
# Needed for authkit-nextjs library example, defined in WorkOS dashboard
WORKOS_REDIRECT_URI=

# Needed for authkit-nextjs library example. Must be at least 32 characters long
WORKOS_COOKIE_PASSWORD=
```

To generate a secure cookie password, you can use the [1Password generator](https://1password.com/password-generator/) or use the `openssl` library to generate a strong password on the command line:

```bash
openssl rand -base64 24
```

### Sessions

For the example with client-side sessions, you will need to add a JWT secret as an environment variable. It can be any random base64 string for testing locally. You can use the `openssl` library to easily generate a key.

```bash
openssl rand -base64 32
```

And update the `.env.local` file:

```bash
# ...
JWT_SECRET_KEY="<your JTW secret>"
```
