<p align="center">
    <img src="https://github.com/workos/authkit-examples/assets/896475/c11765ce-cf6c-4157-87fd-c7776b509657" width="72" height="72" />
    <h1 align="center">Using AuthKit with your own UI</h1>
    <p align="center">How to use AuthKit with your own frontend using headless User Management APIs</p>
    <p align="center"><strong><a href="#examples">View the examples</a></strong>&nbsp;&nbsp;·&nbsp;&nbsp;<strong><a href="https://workos.com/docs/user-management">Explore the docs ↗</a></strong></p>
    <br><br><br>
</p>

## Setup

First, make sure you have set up the [environment variables](/#environment-variables) and [redirects](/#redirects).

For each example, you will need to ensure the applicable authentication method is enabled in your WorkOS dashboard. To do so navigate to **Authentication** and edit the applicable authentication method and ensure it is set to **Enabled**.

For the Google OAuth and Microsoft OAuth examples, WorkOS provides demo app credentials to use in your WorkOS staging environment. This allows you to test these authentication flows without having to set up your own OAuth apps.

## Examples

### Sign-up

- [Email + Password](./sign-up/email-password/page.tsx)
- [Magic Auth](./sign-up/magic-auth/page.tsx)

### Sign-in

- [Email + Password](./sign-in/email-password/page.tsx)
- [Magic Auth](./sign-in/magic-auth/page.tsx)
- [Google OAuth](./sign-in/google-oauth/page.tsx)
- [Microsoft OAuth](./sign-in/microsoft-oauth/page.tsx)
- [Single Sign-On](./sign-in/sso/page.tsx)

For the Single Sign-On example, you will need to create an organization in your WorkOS dashboard. Navigate to **Organizations** and then **Create organization**. Enter a name for this organization, and optionally add a domain that the members will use to sign in. You will also need to create a Single Sign-On connection in the WorkOS dashboard for this organization. On this organization's detail page, navigate to the authentication section, find **Single Sign-On**. For the purposes of this example, we will use the **Configure Manually** feature to create a new connection. This requires you to have access to an identity provider (IdP) for testing such as Entra ID (Azure AD), Google Workspace, or Okta.

You will also need to copy the **Organization ID** from the organization you created with the active Single Sign-On connection. This is located below the organization's name on its detail page (beginning with `org_`). Copy it and add it to your `.env.local` file.

```bash
SSO_ENABLED_ORGANIZATION_ID="<your Organization ID>"
```

### Other

- [Multi-Factor Auth](./mfa/page.tsx)
- [Verify email](./verify-email/page.tsx)
- [Reset password](./reset-password/page.tsx)
- [Users table](./users-table/page.tsx)
- [Update user](./update-user/page.tsx)
