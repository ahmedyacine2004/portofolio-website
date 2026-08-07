# Forms Guide

Forms should be built with predictable validation, reusable field patterns, and accessible interaction states.

## Recommended stack

- React Hook Form for form state management
- Zod for schema validation
- TypeScript for typed form data

## Form architecture

- Define validation schemas in the schema layer.
- Keep form components focused on presentation.
- Separate validation logic from UI code when possible.
- Use shared input components for consistent layout and styling.

## Validation approach

Validation should occur:

- at the client for instant feedback
- at the server for safety and correctness

## Accessibility requirements

Forms should include:

- labels for all form fields
- descriptive error messages
- keyboard-friendly interactions
- clear focus management

## Example flow

For a contact form:

1. Define a Zod schema.
2. Connect the form to React Hook Form.
3. Display validation feedback inline.
4. Submit through the API service layer.
5. Show success or error state after the request completes.
