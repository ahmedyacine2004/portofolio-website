# Deployment Guide

The application is designed to be deployed as a modern full-stack web app with a separate frontend and backend runtime.

## Recommended deployment targets

- Frontend: Vercel or a similar static/runtime hosting platform
- Backend: Render, Railway, DigitalOcean, or a container-based host
- Database: MongoDB Atlas or another managed MongoDB service

## Build checklist

Before deploying:

1. Confirm all required environment variables are set.
2. Build both applications successfully.
3. Verify the API base URL used by the client points to the production backend.
4. Ensure CORS and security settings are appropriate for the deployment environment.

## Production considerations

- Use production-grade environment values.
- Enable secure headers and appropriate CORS policies.
- Monitor application logs and errors after deployment.
- Keep deployment configuration under version control where possible.
