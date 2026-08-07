# API Guide

The backend exposes a small but extensible API surface for the portfolio application.

## Current API contract

The current server exposes a health-style endpoint at:

- `GET /api`

This endpoint returns a simple success payload including a timestamp and version identifier.

## Conventions

- Use REST-style resource naming.
- Return consistent JSON response envelopes when possible.
- Prefer clear status codes and descriptive messages.
- Validate request bodies, params, and query values.

## Suggested response shape

A typical API response should follow this pattern:

```json
{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}
```

## Future API expansion

As the portfolio grows, additional endpoints should be added using feature-specific modules. Examples include:

- projects
- experience entries
- services
- contact submissions
- certifications

## Documentation

Swagger is configured for API documentation. Review the Swagger UI when the server is running to inspect the currently exposed endpoints and their payloads.
