# auhkit-examples

## Setup

You will need to make a few environment variables available to the app. You can do this by creating a `.env.local` file in the root of the project. The file should look like this:

```bash
WORKOS_CLIENT_ID="client_id_found_in_your_workos_dashboard"
WORKOS_API_KEY="api_key_found_in_your_workos_dashboard"
SSO_ENABLED_DOMAIN="a_domain_for_an_organisation_your_want_to_test_sso_with"
```

You will also need to make sure you turn on/off the features your are testing in the [WorkOS Dashboard](https://dashboard.workos.com/).

## Examples

### Sign-up

- [Email + Password](./src/app/sign-up/email-password/page.tsx)
- [Magic Auth](./src/app/sign-up/magic-auth/page.tsx)

### Sign-in

- [Email + Password](./src/app/sign-in/email-password/page.tsx)
- [Magic Auth](./src/app/sign-in/magic-auth/page.tsx)
- [Google OAuth](./src/app/sign-in/google-oauth/page.tsx)
- [Microsoft OAuth](./src/app/sign-in/microsoft-oauth/page.tsx)
- [Single Sign-On](./src/app/sign-in/sso/page.tsx)

### Other

- [Multi-Factor Auth](./src/app/mfa/page.tsx)
- [Verify email](./src/app/verify-email/page.tsx)
- [Reset password](./src/app/reset-password/page.tsx)
- [Users table](./src/app/users-table/page.tsx)

```

```
