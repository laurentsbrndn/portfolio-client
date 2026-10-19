import { Fragment } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Profile } from '../../types/portfolio';
import { EASE_OUT, fadeUp, stagger } from '../../lib/motion';
import { Avatar } from '../common/Avatar';
import { SocialLinks } from '../common/SocialLinks';
import { ArrowRightIcon, FileTextIcon } from '../common/Icons';

interface Props {
  profile: Profile | null;
}

const FALLBACK_NAME = 'Laurentius Brandon Vikario';
const FALLBACK_HEADLINE =
  'Building scalable solutions across Fullstack Web Development & iOS Applications.';

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
};

const avatarReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const HeroSection = ({ profile }: Props) => {
  const name = profile?.fullName?.trim() || FALLBACK_NAME;
  const words = name.split(/\s+/);
  const headline = profile?.headline?.trim() || FALLBACK_HEADLINE;

  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100dvh-1rem)] flex-col justify-center pb-24 pt-32 md:pt-40"
    >
      {/* Background: soft glow + masked grid (full-bleed) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2">
        <div
          className="absolute left-1/2 top-[10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--text-main) 7%, transparent), transparent)',
          }}
        />
        <div className="bg-grid fade-mask absolute inset-0 opacity-70 dark:opacity-50" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.08, 0.1)}
        className="grid items-center gap-14 md:grid-cols-[1fr_auto] md:gap-16"
      >
        {/* Text */}
        <div className="order-2 text-center md:order-1 md:text-left">
          {profile?.location && (
            <motion.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-surface-border/80 bg-surface/80 px-3.5 py-1.5 font-mono text-xs text-secondary backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Based in {profile.location}
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="mb-3 font-mono text-sm text-secondary">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={stagger(0.08)}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {words.map((word, index) => {
              const isLast = index === words.length - 1;
              return (
                <Fragment key={`${word}-${index}`}>
                  <motion.span variants={wordReveal} className="inline-block">
                    {word}
                    {isLast && <span className="text-secondary">.</span>}
                  </motion.span>
                  {!isLast && ' '}
                </Fragment>
              );
            })}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg font-medium text-primary/80 md:text-xl">
            {headline}
          </motion.p>

          {profile?.bio && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-secondary md:mx-0 md:text-base"
            >
              {profile.bio}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
              >
                <FileTextIcon className="h-4 w-4" />
                View Resume
              </a>
            )}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-surface-border bg-background/60 px-6 py-3 text-sm font-semibold text-primary backdrop-blur transition-all hover:border-secondary/40 hover:bg-surface active:scale-[0.98]"
            >
              Get in Touch
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4 md:justify-start">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Find me on</span>
            <span aria-hidden="true" className="h-px w-8 bg-surface-border" />
            <SocialLinks profile={profile} />
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div variants={avatarReveal} className="order-1 mx-auto md:order-2">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-72 lg:w-72">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full border border-surface-border/50" />
            <div
              aria-hidden="true"
              className="absolute -inset-4 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-surface-border"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-full w-full"
            >
              <Avatar
                key={profile?.avatarUrl ?? 'no-avatar'}
                src={profile?.avatarUrl}
                name={name}
                position="50% 15%"
                className="h-full w-full border border-surface-border shadow-[0_20px_60px_-20px_color-mix(in_srgb,var(--text-main)_30%,transparent)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-surface-border">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-primary"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
};