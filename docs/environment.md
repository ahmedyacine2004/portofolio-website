# Environment Configuration

Environment variables are used to configure both the client and server apps without hard-coding runtime-specific values.

## Client variables

The client expects values such as:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`

These values should be defined in the frontend environment file and should match the deployment target.

## Server variables

The backend uses server-side environment values for configuration such as:

- application port
- frontend URL
- database connection settings
- JWT configuration if required later

## Best practices

- Never commit secrets or private credentials.
- Keep default values minimal and safe.
- Document new environment variables when adding features that depend on them.
