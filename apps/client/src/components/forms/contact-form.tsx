'use client';

import type { ContactFormValues } from '@/schemas';

import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useContactForm();

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Your name"
          {...register('name')}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        {errors.name && <p className="text-sm text-danger">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        {errors.email && <p className="text-sm text-danger">{errors.email.message}</p>}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>

        <input
          id="subject"
          type="text"
          placeholder="Project inquiry"
          {...register('subject')}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        {errors.subject && <p className="text-sm text-danger">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project..."
          {...register('message')}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />

        {errors.message && <p className="text-sm text-danger">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
