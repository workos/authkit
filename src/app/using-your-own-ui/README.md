# Using AuthKit with your own UI

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
- [Update user](./src/app/using-your-own-ui/update-user/page.tsx)
