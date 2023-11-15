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

For each example, you will need to ensure the applicable authentication method is enabled in your WorkOS dashboard. To do so navigate to **Authentication** and edit the applicable authentication method and ensure it is set to **Enabled**.

### Sign-up

- [Email + Password](./src/app/using-your-own-ui/sign-up/email-password/page.tsx)
- [Magic Auth](./src/app/using-your-own-ui/sign-up/magic-auth/page.tsx)

### Sign-in

- [Email + Password](./src/app/using-your-own-ui/sign-in/email-password/page.tsx)
- [Magic Auth](./src/app/using-your-own-ui/sign-in/magic-auth/page.tsx)
- [Google OAuth](./src/app/using-your-own-ui/sign-in/google-oauth/page.tsx)
- [Microsoft OAuth](./src/app/using-your-own-ui/sign-in/microsoft-oauth/page.tsx)
- [Single Sign-On](./src/app/using-your-own-ui/sign-in/sso/page.tsx)

For the Google OAuth and Microsoft OAuth examples, WorkOS provides demo app credentials to use in your WorkOS staging environment. This allows you to test these authentication flows without having to set up your own OAuth apps.

For the Single Sign-On example, you will need to create an organization in your WorkOS dashboard. Navigate to **Organizations** and then **Create organization**. Enter a name for this organization, and optionally add a domain that the members will use to sign in. Once created, copy the **Organization ID** (located below the organization's name on its detail page) and add it to your `.env.local` file.

```bash
SSO_ENABLED_ORGANIZATION_ID="<your Organization ID>"
```

You will also need to create an Single Sign-On connection in the WorkOS dashboard for this organization. Navigate to **Organizations**, find the organization, and navigate to its detail page. In the authentication section, find **Single Sign-On**. For the purposes of this example, we use the **Configure Manually** feature to create a new connection.

### Other

- [Multi-Factor Auth](./src/app/using-your-own-ui/mfa/page.tsx)
- [Verify email](./src/app/using-your-own-ui/verify-email/page.tsx)
- [Reset password](./src/app/using-your-own-ui/reset-password/page.tsx)
- [Users table](./src/app/using-your-own-ui/users-table/page.tsx)
