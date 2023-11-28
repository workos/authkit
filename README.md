<p align="center">
    <img src="https://github.com/workos/authkit/assets/896475/90c2cf08-7f61-4123-b96a-bd139cd7f988" width="72" height="72" />
    <h1 align="center">AuthKit</h1>
    <p align="center">How to use AuthKit's hosted UI or build your own frontend with the headless User Management APIs</p>
    <p align="center"><a href="https://workos.com/docs/user-management">Explore the docs ↗</a></strong></p>
    <br><br><br>
</p>

## Examples

There are two ways to use AuthKit and this repository contains examples for both:

- [Using AuthKit's hosted UI](./src/app/using-hosted-authkit)
  This is the fastest way to add authentication to your app with AuthKit and WorkOS User Management. In includes a fully themeable hosted UI that handles all of your authentication flows. When you're ready to go to production you can point it to a custom domain (`auth.yourapp.com`) to match your application.
- [Using your own custom UI](./src/app/using-your-own-ui)
  Use all of the features of AuthKit, but build out the UI yourself in your own codebase by integrating directly with the headless WorkOS User Management APIs. Your authentication UI will be self-hosted in your application.

## Prerequisites

You will need a [WorkOS account](https://dashboard.workos.com/signup).

### Environment variables

Sign in to your [WorkOS dashboard](https://dashboard.workos.com), navigate to **API Keys** and copy the **Client ID** and the **Secret Key** (API Key).

Rename the `.env.local.example` file to `.env.local` and supply your _Client ID_ and _Secret Key_.

```bash
WORKOS_CLIENT_ID="<your Client ID>"
WORKOS_API_KEY="<your Secret Key>"
```

### Redirects

In your [WorkOS dashboard](https://dashboard.workos.com), navigate to **Redirects** and add the following urls:

```bash
http://localhost:3000/using-your-own-ui/sign-in/google-oauth/callback
```

```bash
http://localhost:3000/using-your-own-ui/sign-in/microsoft-oauth/callback
```

```bash
http://localhost:3000/using-your-own-ui/sign-in/sso/callback
```

```bash
http://localhost:3000/using-hosted-authkit/basic/callback
```

```bash
http://localhost:3000/using-hosted-authkit/with-session/callback
```
