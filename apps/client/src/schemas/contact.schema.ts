import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be less than 100 characters.'),

  email: z.email('Please enter a valid email address.'),

  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters.')
    .max(150, 'Subject must be less than 150 characters.'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be less than 2000 characters.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
