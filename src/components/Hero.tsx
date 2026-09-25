import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Mail, Download, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export type HeroSocial = { label: string; href: string };
export type HeroCta = { label: string; href: string };

export interface HeroProps {
  eyebrow?: string;
  name?: string;
  role?: string;
  tagline?: string;
  description?: string;
  status?: string;
  socials?: HeroSocial[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryCta?: HeroCta;
  photo?: string;
  photoAlt?: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

function socialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('github')) return <GithubIcon size={18} />;
  if (l.includes('linkedin')) return <LinkedinIcon size={18} />;
  return <Mail size={18} />;
}

export default function Hero({
  eyebrow = 'AI × CLOUD × SOFTWARE',
  name = '[NAME]',
  role = '[TITLE]',
  tagline = '[TAGLINE]',
  description = '[DESCRIPTION]',
  status = 'OPEN TO OPPORTUNITIES',
  socials = [],
  primaryCta = { label: 'View Projects', href: '#projects' },
  secondaryCta = { label: 'Download Resume', href: '#contact' },
  tertiaryCta = { label: "Let's Connect", href: '#contact' },
  photo,
  photoAlt = 'Profile photo'
}: HeroProps) {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section className="hero" id="home">
      <div className="hero-glow" aria-hidden="true">
        <div className="hero-glow--a" />
        <div className="hero-glow--b" />
      </div>

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero-eyebrow" variants={item}>
            {eyebrow}
          </motion.p>

          <motion.h1 className="hero-name" variants={item}>
            {name}
          </motion.h1>

          <motion.h2 className="hero-role" variants={item}>
            {role}
          </motion.h2>

          <motion.p className="hero-tagline" variants={item}>
            {tagline}
          </motion.p>

          <motion.p className="hero-desc" variants={item}>
            {description}
          </motion.p>

          <motion.div className="hero-status-block" variants={item}>
            <span className="hero-status">
              <span className="hero-status-dot" aria-hidden="true" />
              {status}
            </span>
          </motion.div>

          <motion.div className="hero-cta-row" variants={item}>
            <a className="btn btn--primary" href={primaryCta.href}>
              {primaryCta.label} <ArrowRight size={16} />
            </a>
            <a
              className="btn btn--ghost"
              href={secondaryCta.href}
              download="Hariharasudhan_P_Resume.pdf"
            >
              {secondaryCta.label} <Download size={15} />
            </a>
            <a className="btn btn--ghost" href={tertiaryCta.href}>
              {tertiaryCta.label} <Send size={15} />
            </a>
          </motion.div>

          {socials.length > 0 && (
            <motion.div className="hero-socials" variants={item}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  className="hero-social"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  {socialIcon(s.label)}
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="hero-visual-bg" aria-hidden="true" />
          <div className="hero-photo-frame">
            <div className="hero-photo-wrap">
              {photo && !photoError ? (
                <img src={photo} alt={photoAlt} onError={() => setPhotoError(true)} />
              ) : (
                <span className="hero-photo-placeholder">Profile Photo</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}