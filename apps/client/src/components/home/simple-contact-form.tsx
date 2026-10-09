'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail, Send } from 'lucide-react';
import Image from 'next/image';

import { env } from '@/lib/env';
import { contactSchema, type ContactFormValues } from '@/schemas';
import { submitContactForm } from '@/services/web3forms.service';

const emptyForm: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const fields: {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea';
}[] = [
  {
    name: 'name',
    label: 'Your name',
    placeholder: 'The name I should know you by',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'Where I can send a thoughtful reply',
    type: 'email',
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'A product to shape, a team to join, an idea to explore',
    type: 'text',
  },
  {
    name: 'message',
    label: 'Message',
    placeholder:
      'What are you hoping to make possible? Share the context, the ambition, and where you would like my experience to fit.',
    type: 'textarea',
  },
];

export function SimpleContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (
          (field === 'name' || field === 'email' || field === 'subject' || field === 'message') &&
          !nextErrors[field]
        ) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please check the highlighted fields and try again.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await submitContactForm(result.data, env.web3FormsAccessKey, 'ahmedyacineabbane@gmail.com');
      setValues(emptyForm);
      setStatus({
        type: 'success',
        message: 'Thanks for reaching out. Your message has been sent successfully.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to send your message right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (name: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  return (
    <section id="contact" className="scroll-mt-20 px-5 pb-14 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 max-w-2xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Have a project in mind?
          </p>
          <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">
            Let’s build something amazing.
          </h2>
          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            Tell me what you’re working on. I’m open to full-time opportunities, freelance work, and
            creative collaborations.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[8px] border border-border bg-card lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="relative flex flex-col justify-between overflow-hidden bg-primary p-6 text-primary-foreground sm:p-8 xl:justify-start xl:gap-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 right-5 hidden h-24 w-32 opacity-75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] xl:block sm:h-28 sm:w-36"
            >
              <Image
                src="/branding/logo.png"
                alt=""
                width={180}
                height={140}
                className="h-full w-full object-contain"
              />
            </span>
            <div className="relative">
              <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-white/15">
                <Mail className="size-5" />
              </span>
              <h3 className="mt-5 font-sans text-3xl font-bold uppercase leading-none">
                Let’s talk
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-5 text-primary-foreground/80">
                Have a question or an idea? Send a note and I’ll get back to you.
              </p>
            </div>
            <a
              href="mailto:ahmedyacineabbane@gmail.com"
              className="relative mt-8 inline-flex items-center gap-2 text-xs font-semibold hover:underline xl:mt-0"
            >
              ahmedyacineabbane@gmail.com <ArrowUpRight className="size-3.5" />
            </a>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 p-5 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-2">
              {fields.slice(0, 2).map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`simple-contact-${field.name}`}
                    className="mb-1.5 block text-[11px] font-semibold"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`simple-contact-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.name === 'name' ? 'name' : 'email'}
                    required
                    maxLength={field.name === 'name' ? 100 : undefined}
                    value={values[field.name]}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name] ? `simple-contact-${field.name}-error` : undefined
                    }
                    className="w-full rounded-[8px] border border-border bg-background px-3 py-2.5 text-xs outline-none transition-colors placeholder:text-foreground-tertiary focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-danger"
                    placeholder={field.placeholder}
                    disabled={isSubmitting}
                  />
                  {errors[field.name] && (
                    <p
                      id={`simple-contact-${field.name}-error`}
                      className="mt-1 text-[10px] text-danger"
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {fields.slice(2).map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={`simple-contact-${field.name}`}
                  className="mb-1.5 block text-[11px] font-semibold"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={`simple-contact-${field.name}`}
                    name={field.name}
                    required
                    maxLength={2000}
                    rows={4}
                    value={values[field.name]}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name] ? `simple-contact-${field.name}-error` : undefined
                    }
                    className="w-full resize-y rounded-[8px] border border-border bg-background px-3 py-2.5 text-xs outline-none transition-colors placeholder:text-foreground-tertiary focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-danger"
                    placeholder={field.placeholder}
                    disabled={isSubmitting}
                  />
                ) : (
                  <input
                    id={`simple-contact-${field.name}`}
                    name={field.name}
                    type="text"
                    required
                    maxLength={150}
                    value={values[field.name]}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name] ? `simple-contact-${field.name}-error` : undefined
                    }
                    className="w-full rounded-[8px] border border-border bg-background px-3 py-2.5 text-xs outline-none transition-colors placeholder:text-foreground-tertiary focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-danger"
                    placeholder={field.placeholder}
                    disabled={isSubmitting}
                  />
                )}
                {errors[field.name] && (
                  <p
                    id={`simple-contact-${field.name}-error`}
                    className="mt-1 text-[10px] text-danger"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {status && (
              <p
                role={status.type === 'error' ? 'alert' : 'status'}
                className={`rounded-[8px] border px-3 py-2.5 text-xs ${
                  status.type === 'success'
                    ? 'border-success/30 bg-success/10 text-success-dark dark:text-success'
                    : 'border-danger/30 bg-danger/10 text-danger'
                }`}
              >
                {status.type === 'success' && <CheckCircle2 className="mr-1.5 inline size-4" />}
                {status.message}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] text-foreground-tertiary">
                Your details are only used to reply to your message.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-[8px] bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    Sending <LoaderCircle className="size-3.5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <Send className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
