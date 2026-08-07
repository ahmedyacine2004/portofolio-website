# Backend Guide

The backend is built with NestJS and provides the application API layer and supporting configuration.

## Tech stack

- NestJS
- TypeScript
- ConfigModule for environment-based configuration
- Mongoose for MongoDB access
- Swagger for API documentation
- Validation pipes for request safety

## Core structure

The server entry point is the `src/main.ts` file. Application bootstrapping, middleware, CORS, validation, filters, and Swagger setup are handled there.

The root module in `src/app.module.ts` wires together configuration, the database module, and the main application controller.

## Recommended module organization

When adding new backend features, create a feature-oriented module that includes:

- controllers
- services
- DTOs
- schemas or entities
- repositories or providers when needed

## Configuration and environment

Configuration is centralized through NestJS config providers. Keep environment-specific values in the runtime environment rather than hard-coding them.

## Validation and error handling

- Use DTO validation for incoming payloads.
- Prefer global validation pipes and filters for consistent error handling.
- Return meaningful messages and structured responses.

## Database considerations

MongoDB is used through Mongoose. Keep schemas clean, validate input before persistence, and use indexes where necessary for scaling.
