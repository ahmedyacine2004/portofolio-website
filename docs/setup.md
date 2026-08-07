# Setup Guide

This guide covers the local setup process for the portfolio monorepo.

## Prerequisites

Make sure the following tools are installed:

- Node.js 22 or newer
- npm 10 or newer
- Git
- A running MongoDB instance if you plan to use the backend with persistence

## Installation

1. Clone the repository.
2. Install workspace dependencies from the repository root:

```bash
npm install
```

3. Copy the example environment files and fill in the required values.

## Run the applications

### Frontend

```bash
npm run dev:client
```

The client app will be available at `http://localhost:3000`.

### Backend

```bash
npm run dev:server
```

The API server will run on the port defined in your environment configuration.

## Useful scripts

From the repository root:

- `npm run build:client`
- `npm run build:server`
- `npm run lint:client`
- `npm run lint:server`
- `npm run format`

## Troubleshooting

- If the frontend fails to start, verify that dependencies were installed correctly.
- If the backend cannot connect to MongoDB, confirm the database URI and network access.
- If you see environment-related errors, check the values defined in the client and server environment files.

## Recommended workflow

- Use the client and server terminals separately while developing.
- Keep your environment variables scoped to the relevant app.
- Run linting and builds before opening a pull request.
