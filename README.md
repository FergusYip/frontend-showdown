# Ritter

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Development](#development)
  - [Secrets](#secrets)
  - [Migrations](#migrations)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [Dokku](#dokku)
  - [DIY](#diy)

## Overview

Ritter is a Twitter-like application built with [Remix](https://remix.run/), [Prisma](https://www.prisma.io/), and [Tailwind CSS](https://tailwindcss.com/).

## Development

From your terminal:

```sh
yarn dev
```

This will use [concurrently](https://www.npmjs.com/package/concurrently) to run PostCSS and the Remix development server. When you change a file, the app will rebuild automatically.

You can run PostCSS individually using the following commands:

Automatically rebuild CSS

```sh
yarn run watch-css
```

Build CSS once

```sh
yarn run build-css
```

You can also run the Remix development server using the following command:

```sh
yarn run remix-dev
```

### Secrets

Secrets are loaded into the application via environment variables. See `.env.example` for a list of required variables. You can specify these variables in a `.env` file.

### Migrations

See the [Prisma Documentation](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate) for how to migrate the database.

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### Docker

The Dockerfile used in the root of the repository can also be used to deploy the application.

### Dokku

Since there is a Dockerfile, this application is ready to be deployed to Dokku.

This repository even has a GitHub Action which will automatically deploy the application to the specified Dokku instance.

Make sure you fill in the `DOKKU_GIT_REMOTE` and `DOKKU_SSH_PRIVATE_KEY` secrets accordingly.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
