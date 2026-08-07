# State Management Guide

The application uses a lightweight and practical state strategy based on React Query and Zustand.

## React Query

React Query is used for server state, including asynchronous data loading and request lifecycle handling.

Use it for:

- fetching portfolio data
- caching API responses
- handling loading and error states
- invalidating and refetching data when needed

## Zustand

Zustand is used for lightweight client state such as UI interactions, navigation state, and local preferences.

Use it for:

- sidebar state
- temporary UI flags
- theme or view state
- other local interaction state that does not need a heavy state library

## Guidance

- Keep server state in React Query.
- Keep local UI state in Zustand.
- Avoid storing derived values in multiple places.
- Keep state updates predictable and easy to reason about.
