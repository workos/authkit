<p align="center">
    <img src="https://github.com/workos/authkit-examples/assets/896475/c11765ce-cf6c-4157-87fd-c7776b509657" width="72" height="72" />
    <h1 align="center">AuthKit Examples</h1>
    <p align="center">How to use AuthKit's hosted UI or build your own frontend with the headless User Management APIs</p>
    <p align="center"><strong><a href="#examples">View the examples</a></strong>&nbsp;&nbsp;·&nbsp;&nbsp;<strong><a href="https://workos.com/docs/user-management">Explore the docs</a></strong></p>
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
- Install the WorkOS Node SDK

  ```bash
  npm install @workos-inc/node
  ```

## Examples

There are two ways to use AuthKit and this repository contains examples for both:

- [Using AuthKit's hosted UI](#using-authkits-hosted-ui)
- [Building your own custom UI](#building-your-own-custom-ui)
