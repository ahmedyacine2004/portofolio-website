'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { contactSchema, type ContactFormValues } from '@/schemas';

export function useContactForm() {
  return useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },

    mode: 'onBlur',
  });
}
