<p align="center">
    <img src="https://github.com/workos/authkit-examples/assets/896475/c11765ce-cf6c-4157-87fd-c7776b509657" width="72" height="72" />
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
- [With client-side sessions](./with-session/page.tsx). How to use AuthKit's hosted UI and manage sessions client-side using JavaScript Web Tokens (JWTs).

For the example with session, you will need to add a JWT secret as an environment variable. It can be any random string for testing locally, but as a best practice let's generate a secret key from the command line using the node crypto module:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

And update the `.env.local` file:

```bash
# ...
JWT_SECRET_KEY="<your JTW secret>"
```
