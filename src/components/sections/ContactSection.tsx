import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import type { Profile } from '../../types/portfolio';
import type { ContactPayload } from '../../types/contact';
import { sendContactForm } from '../../api/portfolioAPI';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Reveal } from '../common/Reveal';
import { SocialLinks } from '../common/SocialLinks';
import { CheckIcon, MailIcon, MapPinIcon, SendIcon } from '../common/Icons';

interface Props {
  profile?: Profile | null;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_FORM: ContactPayload = { name: '', email: '', subject: '', message: '' };
const MESSAGE_MAX = 2000;

const labelClass = 'mb-2 block font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary';
const inputClass =
  'w-full rounded-xl border border-surface-border bg-background px-4 py-3 text-sm text-primary outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-secondary/50 hover:border-secondary/40 focus:border-primary focus:ring-4 focus:ring-primary/10';

export const ContactSection = ({ profile }: Props) => {
  const id = useId();
  const [form, setForm] = useState<ContactPayload>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const email = profile?.email;
  const location = profile?.location;

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => setStatus('idle'), 6000);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;

    // Honeypot: real users never fill this hidden field
    if (new FormData(event.currentTarget).get('company')) {
      setForm(INITIAL_FORM);
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setForm(INITIAL_FORM);
      setStatus('success');
    } catch (error) {
      const apiMessage = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      setErrorMessage(apiMessage || 'Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  const contactInfo = (
    <Reveal className="space-y-3">
      {email && (
        <div className="flex items-center gap-4 rounded-2xl border border-surface-border/70 bg-surface/80 p-4 backdrop-blur">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background text-primary ring-1 ring-surface-border">
            <MailIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-secondary">Email</p>
            <a
              href={`mailto:${email}`}
              className="block truncate text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="shrink-0 rounded-full px-3 py-1.5 font-mono text-xs text-secondary transition-colors hover:bg-accent-soft hover:text-primary"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      {location && (
        <div className="flex items-center gap-4 rounded-2xl border border-surface-border/70 bg-surface/80 p-4 backdrop-blur">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background text-primary ring-1 ring-surface-border">
            <MapPinIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-secondary">Location</p>
            <p className="text-sm font-semibold text-primary">{location}</p>
          </div>
        </div>
      )}

      <SocialLinks profile={profile} className="pt-2" />
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </Reveal>
  );

  return (
    <Section
      id="contact"
      index="07"
      tag="Contact"
      title="Start a Conversation"
      subtitle="Have a project in mind or an exciting opportunity? Drop a message and I'll get back to you."
      texture="grid"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Contact info */}
        <div className="min-w-0 lg:col-span-4">{contactInfo}</div>

        {/* Form */}
        <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
          <Card spotlight={false} className="bg-surface/80 p-6 backdrop-blur md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className={labelClass}>Name</label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Brandon Vikario"
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className={labelClass}>Email</label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="brandonvikario607@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${id}-subject`} className={labelClass}>Subject</label>
                <input
                  id={`${id}-subject`}
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={150}
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Inquiry about..."
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor={`${id}-message`} className={labelClass}>Message</label>
                  <span className="font-mono text-[11px] text-secondary">
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  maxLength={MESSAGE_MAX}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Hi, I'd like to discuss..."
                />
              </div>

              {/* Honeypot (hidden from users & assistive tech) */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    key="error"
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <SendIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
};