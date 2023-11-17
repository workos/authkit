# Using AuthKit's hosted UI

## Setup

For all examples, you will need to ensure the applicable authentication method is enabled in your WorkOS dashboard. To do so navigate to **Authentication** and edit the applicable authentication method and ensure it is set to **Enabled**.

For the Google OAuth and Microsoft OAuth examples, WorkOS provides demo app credentials to use in your WorkOS staging environment. This allows you to test these authentication flows without having to set up your own OAuth apps.

For the Single Sign-On example, you will need to create an organization in your WorkOS dashboard. Navigate to **Organizations** and then **Create organization**. Enter a name for this organization, and optionally add a domain that the members will use to sign in. You will also need to create a Single Sign-On connection in the WorkOS dashboard for this organization. On this organization's detail page, navigate to the authentication section, find **Single Sign-On**. For the purposes of this example, we will use the **Configure Manually** feature to create a new connection. This requires you to have access to an identity provider (IdP) for testing such as Entra ID (Azure AD), Google Workspace, or Okta.

## Examples

- [Basic authentication](./src/app/using-authkit/basic/page.tsx). How to use AuthKit's hosted UI with any authenitication method (Email + Password, Magic OAuth, Google OAuth, Microsoft OAuth, and Single Sign-On).
- [With client-side sessions](./src/app/using-authkit/with-session/page.tsx). How to use AuthKit's hosted UI and mangage sessions client-side using JavaScript Web Tokens (JWTs).
