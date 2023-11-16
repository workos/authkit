<p align="center">
    <img src="https://github.com/workos/authkit-examples/assets/896475/c11765ce-cf6c-4157-87fd-c7776b509657" width="72" height="72" />
    <h1 align="center">AuthKit Examples</h1>
    <p align="center">How to use AuthKit's hosted UI or build your own frontend with the WorkOS User Management APIs</p>
    <p align="center"><strong><a href="https://workos.com/docs/user-management">Explore the docs</a></strong></p>
    <br><br><br>
</p>

## Setup

- You will need a [WorkOS account](https://dashboard.workos.com/signup)
- Sign in to your [WorkOS dashboard](https://dashboard.workos.com), navigate to **API Keys** and copy the **Client ID** and the **Secret Key** (API Key).
- Rename the `.env.local.example` file to `.env.local` and supply your _Client ID_ and _Secret Key_.

  ```bash
  WORKOS_CLIENT_ID="<your Client ID>"
  WORKOS_API_KEY="<your Secret Key>"
  ```

## Examples

There are two ways to use AuthKit and this repository contains examples for both:

- [Using AuthKit's hosted UI](#using-authkits-hosted-ui)
- [Building your own custom UI](#building-your-own-custom-ui)

For each example, you will need to ensure the applicable authentication method is enabled in your WorkOS dashboard. To do so navigate to **Authentication** and edit the applicable authentication method and ensure it is set to **Enabled**.

For the Google OAuth and Microsoft OAuth examples, WorkOS provides demo app credentials to use in your WorkOS staging environment. This allows you to test these authentication flows without having to set up your own OAuth apps.

For the Single Sign-On examples, you will need to create an organization in your WorkOS dashboard. Navigate to **Organizations** and then **Create organization**. Enter a name for this organization, and optionally add a domain that the members will use to sign in. You will also need to create a Single Sign-On connection in the WorkOS dashboard for this organization. On this organization's detail page, navigate to the authentication section, find **Single Sign-On**. For the purposes of this example, we will use the **Configure Manually** feature to create a new connection. This requires you to have access to an identity provider (IdP) for testing such as Entra ID (Azure AD), Google Workspace, or Okta.

### Using AuthKit's hosted UI

- [Basic authentication](./src/app/using-authkit/basic/page.tsx). How to use AuthKit's hosted UI with any authenitication method (Email + Password, Magic OAuth, Google OAuth, Microsoft OAuth, and Single Sign-On).
- [With client-side sessions](./src/app/using-authkit/with-session/page.tsx). How to use AuthKit's hosted UI and mangage sessions client-side using Javascript Web Tokens (JWTs).

### Building your own custom UI

#### Sign-up

- [Email + Password](./src/app/using-your-own-ui/sign-up/email-password/page.tsx)
- [Magic Auth](./src/app/using-your-own-ui/sign-up/magic-auth/page.tsx)

#### Sign-in

- [Email + Password](./src/app/using-your-own-ui/sign-in/email-password/page.tsx)
- [Magic Auth](./src/app/using-your-own-ui/sign-in/magic-auth/page.tsx)
- [Google OAuth](./src/app/using-your-own-ui/sign-in/google-oauth/page.tsx)
- [Microsoft OAuth](./src/app/using-your-own-ui/sign-in/microsoft-oauth/page.tsx)
- [Single Sign-On](./src/app/using-your-own-ui/sign-in/sso/page.tsx)

For this Single Sign-On example, you will need to copy the **Organization ID** from an organization with an active Single Sign-On connection. This is located below the organization's name on its detail page (beginning with `org_`). Copy it and add it to your `.env.local` file.

```bash
SSO_ENABLED_ORGANIZATION_ID="<your Organization ID>"
```

#### Other

- [Multi-Factor Auth](./src/app/using-your-own-ui/mfa/page.tsx)
- [Verify email](./src/app/using-your-own-ui/verify-email/page.tsx)
- [Reset password](./src/app/using-your-own-ui/reset-password/page.tsx)
- [Users table](./src/app/using-your-own-ui/users-table/page.tsx)
