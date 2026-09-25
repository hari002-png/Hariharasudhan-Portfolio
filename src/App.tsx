import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Brain,
  Cloud,
  Code,
  ExternalLink,
  FileText,
  Globe,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  User,
  Wrench,
  type LucideIcon
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons';
import { portfolio } from './data/portfolio';
import Hero from './components/Hero';
import Navbar, { type NavItem, type ThemeTone } from './components/Navbar';

const NAV: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

const THEME_KEY = 'portfolio-theme';

function getInitialTone(): ThemeTone {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* ignore storage errors */
  }
  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
}

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } }
};

function RevealSection({
  id,
  className = '',
  children
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

function SecHead({ tag, title, subtitle }: { tag?: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="sec-head">
      {tag && <p className="sec-tag">{tag}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
    </motion.div>
  );
}

function Grid({ className = 'cards', children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={staggerGrid}>
      {children}
    </motion.div>
  );
}

function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -5 }} className={`card ${className}`}>
      {children}
    </motion.article>
  );
}

function IconTile({ icon }: { icon: ComponentType<{ size?: number }> }) {
  const Icon = icon;
  return (
    <div className="card-icon">
      <Icon size={20} />
    </div>
  );
}

const skills = [
  {
    label: 'Programming',
    icon: Code,
    items: [...portfolio.skills.programming, 'OOP']
  },
  {
    label: 'AI / ML',
    icon: Brain,
    items: portfolio.skills.aiMl
  },
  {
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    items: [
      ...portfolio.skills.cloud,
      'Linux',
      ...portfolio.skills.networking.filter((n) => n !== 'Networking Concepts'),
      'Networking'
    ]
  },
  {
    label: 'Tools',
    icon: Wrench,
    items: portfolio.skills.tools
  }
];

const focusItems = [
  { label: 'AI / ML', icon: Brain },
  { label: 'Cloud Computing', icon: Cloud },
  { label: 'Software Development', icon: Code }
];

function certIcon(category: string): LucideIcon {
  const c = category.toLowerCase();
  if (c.includes('cloud')) return Cloud;
  if (c.includes('network')) return Network;
  if (c.includes('linux')) return Terminal;
  if (c.includes('cyber')) return ShieldCheck;
  if (c.includes('web')) return Globe;
  if (c.includes('program')) return Code;
  return Award;
}

function certTag(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('cloud')) return 'Cloud';
  if (c.includes('network')) return 'Networking';
  if (c.includes('linux')) return 'Linux';
  if (c.includes('cyber')) return 'Cybersecurity';
  if (c.includes('web')) return 'Web Development';
  if (c.includes('program')) return 'Programming';
  return 'Computer Science';
}

const extFeatures = [
  'Software Development',
  'AI Integration',
  'UI Design',
  'Technical Documentation',
  'Hackathon Participation',
  'Team Collaboration',
  'Problem Solving'
];

const exploringItems = [
  'AI Applications',
  'Cloud Infrastructure',
  'LLM Integration',
  'Cybersecurity',
  'Accessibility Technology'
];

const extraAchievements = [
  { icon: Code, title: 'Technology Hackathons', text: 'Participated in technology hackathons and innovation workshops.' },
  { icon: Lightbulb, title: 'Innovation Workshops', text: 'Active participant in innovation-focused technical workshops.' },
  { icon: Rocket, title: 'Team-Based Technical Development', text: 'Contributed to team-based technical development on applied projects.' },
  { icon: FileText, title: 'Technical Documentation & Reporting', text: 'Maintained technical documentation and reports across projects.' }
];

function ProjectVisual({
  image,
  mark,
  alt,
  fit = 'cover',
  concept = false
}: {
  image: string;
  mark: string;
  alt: string;
  fit?: 'cover' | 'contain';
  concept?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="case-visual-wrap">
      <div className={`case-visual case-visual--${fit}`}>
        <span className="case-visual-grid" aria-hidden="true" />
        <span className="case-visual-glow" aria-hidden="true" />
        {image && !broken ? (
          <img src={image} alt={alt} onError={() => setBroken(true)} />
        ) : (
          <span className="case-visual-mark">
            <span className="case-visual-short">{mark}</span>
            <span>Case Study</span>
          </span>
        )}
      </div>
      {concept && (
        <p className="case-visual-caption">
          <span className="case-visual-caption-dot" aria-hidden="true" />
          Concept Preview
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [tone, setTone] = useState<ThemeTone>(getInitialTone);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tone);
    try {
      localStorage.setItem(THEME_KEY, tone);
    } catch {
      /* ignore storage errors */
    }
  }, [tone]);

  const toggleTheme = () => setTone((t) => (t === 'dark' ? 'light' : 'dark'));

  const heroDescription =
    'A B.Sc. Information Technology student from Coimbatore, passionate about Artificial Intelligence, Cloud Computing and Software Development — building practical technology and exploring applied, real-world innovations.';

  const resumeHref = portfolio.resume;

  return (
    <>
      <div className="bg-fx" aria-hidden="true">
        <span className="bg-orb bg-orb--blue" />
        <span className="bg-orb bg-orb--electric" />
        <span className="bg-orb bg-orb--mid" />
        <span className="bg-grid" />
      </div>

      <Navbar
        logo="HARIHARASUDHAN P"
        nav={NAV}
        resumeHref={resumeHref}
        tone={tone}
        onToggleTheme={toggleTheme}
      />

      <Hero
        eyebrow="AI × CLOUD × SOFTWARE"
        name={portfolio.name}
        role={portfolio.role}
        tagline={portfolio.tagline}
        description={heroDescription}
        status="OPEN TO OPPORTUNITIES"
        socials={[
          { label: 'GitHub', href: portfolio.social.github },
          { label: 'LinkedIn', href: portfolio.social.linkedin },
          { label: 'Email', href: `mailto:${portfolio.email}` }
        ]}
        primaryCta={{ label: 'View Projects', href: '#projects' }}
        secondaryCta={{ label: 'Download Resume', href: resumeHref }}
        tertiaryCta={{ label: "Let's Connect", href: '#contact' }}
        photo={portfolio.profileImage}
        photoAlt={portfolio.name}
      />

      <main>
        {/* Tech stack strip */}
        <section className="tech-strip">
          <p className="tech-strip-label">Technologies I work with</p>
          <div className="tech-pills">
            {[
              'Python',
              'C++',
              'Java',
              'SQL',
              'C',
              'AI/ML',
              'Prompt Engineering',
              'LLaMA 3',
              'AWS',
              'Linux',
              'Git',
              'GitHub'
            ].map((t) => (
              <span className="tech-pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <RevealSection id="about">
          <SecHead tag="About" title="About Me" subtitle={portfolio.tagline} />
          <div className="about-grid">
            <Card className="about-copy">
              <IconTile icon={User} />
              <p className="about-lead">{portfolio.about}</p>
              <span className="label">Career Vision</span>
              <p className="card-text">{portfolio.career.goal}</p>
            </Card>
            <Card className="focus-card">
              <span className="label" style={{ marginTop: 0 }}>
                Professional Focus
              </span>
              {focusItems.map((f) => (
                <div className="focus-row" key={f.label}>
                  <IconTile icon={f.icon} />
                  <p className="focus-name">{f.label}</p>
                </div>
              ))}
              <div className="focus-chips">
                <span className="label">Strengths</span>
                <div className="chips">
                  {portfolio.career.strengths.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </RevealSection>

        {/* Skills */}
        <RevealSection id="skills">
          <SecHead
            tag="Skills"
            title="Technical Skills"
            subtitle="A hands-on foundation across programming, AI, cloud and infrastructure."
          />
          <Grid className="skills-grid">
            {skills.map((s) => (
              <Card key={s.label}>
                <IconTile icon={s.icon} />
                <span className="label" style={{ marginTop: 16 }}>
                  {s.label}
                </span>
                <div className="chips">
                  {s.items.map((t) => (
                    <span className="skill-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </Grid>
        </RevealSection>

        {/* Projects */}
        <RevealSection id="projects">
          <SecHead
            tag="Projects"
            title="Featured Projects"
            subtitle="Hands-on, applied projects around AI and accessibility."
          />
          <motion.div className="case-grid" variants={staggerGrid}>
            {portfolio.projects.map((p, i) => (
              <motion.article
                className="case-card"
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <ProjectVisual
                  image={p.image}
                  alt={p.title}
                  mark={i === 0 ? 'HAMZUU' : 'AI × ACCESS'}
                  fit={i === 0 ? 'contain' : 'cover'}
                  concept={i === 0}
                />
                <div className="case-body">
                  <p className="case-kicker">Project {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="case-title">{p.title.split('–')[0].replace(/\s+$/, '')}</h3>
                  <p className="case-subtitle">
                    {i === 0 ? 'AI-Powered Educational Platform' : 'AI-Enabled Accessibility System'}
                  </p>
                  <p className="case-desc">{p.description}</p>

                  {p.problem && (
                    <div className="case-block">
                      <span className="label">Problem</span>
                      <p className="case-desc">{p.problem}</p>
                    </div>
                  )}

                  {i === 0 ? (
                    <p className="case-highlight" style={{ marginBottom: 0 }}>
                      <Sparkles size={15} />
                      AI Integration · Personalized Career Suggestions · Educational Guidance ·
                      Onboarding
                    </p>
                  ) : (
                    <p className="case-highlight" style={{ marginBottom: 0 }}>
                      <Trophy size={15} />
                      National Healthcare Hackathon Finalist
                    </p>
                  )}

                  {p.features.length > 0 && (
                    <div className="case-block">
                      <span className="label">Key Features</span>
                      <div className="chips">
                        {p.features.map((f) => (
                          <span className="chip" key={f}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="case-block">
                    <span className="label">Technologies</span>
                    <div className="chips">
                      {p.technologies.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {p.models && (
                    <p className="case-block card-text">
                      <span className="label">Approach</span>
                      {p.models}
                    </p>
                  )}

                  <div className="case-block">
                    <span className="label">My Contribution</span>
                    <ul className="timeline-items">
                      {p.contribution.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  {p.team && <p className="card-text">{p.team}</p>}

                  {(p.github || p.demo) && (
                    <div className="case-actions">
                      {p.github && (
                        <a className="card-link" href={p.github} target="_blank" rel="noreferrer">
                          GitHub <ExternalLink size={13} />
                        </a>
                      )}
                      {p.demo && (
                        <a className="card-link" href={p.demo} target="_blank" rel="noreferrer">
                          Live Demo <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </RevealSection>

        {/* Academic & Project Experience */}
        <RevealSection id="experience">
          <SecHead
            tag="Experience"
            title="Academic & Project Experience"
            subtitle="Student / Fresher — project-based, applied technology experience."
          />
          <Grid className="timeline">
            {portfolio.experience.map((e, i) => (
              <motion.div className="timeline-card" key={e.role} variants={fadeUp}>
                <p className="timeline-kicker">
                  {e.type} · {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="timeline-title">{e.role}</h3>
                <p className="timeline-meta">
                  {e.company} · {e.duration}
                </p>
                <ul className="timeline-items">
                  {e.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div className="timeline-card" variants={fadeUp}>
              <p className="timeline-kicker">Projects · Hackathons · 03</p>
              <h3 className="timeline-title">Applied Technical Development</h3>
              <p className="timeline-meta">Student / Fresher</p>
              <div className="chips" style={{ marginTop: 6 }}>
                {extFeatures.map((f) => (
                  <span className="chip" key={f}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </Grid>
        </RevealSection>

        {/* Education */}
        <RevealSection id="education">
          <SecHead
            tag="Education"
            title="Education"
            subtitle="Formal foundation in information technology."
          />
          <Grid className="timeline">
            {portfolio.education.map((ed) => (
              <motion.div className="timeline-card" key={ed.degree} variants={fadeUp}>
                <p className="timeline-kicker">Education</p>
                <h3 className="timeline-title">{ed.degree}</h3>
                <p className="timeline-meta">
                  {ed.institution} · {ed.location}
                </p>
                <p className="timeline-meta">{ed.duration}</p>
                <div className="chips" style={{ marginTop: 10 }}>
                  {ed.specialization && <span className="chip">{ed.specialization}</span>}
                  {ed.score && <span className="chip">{ed.score}</span>}
                  {ed.graduationYear && <span className="chip">Class of {ed.graduationYear}</span>}
                </div>
              </motion.div>
            ))}
          </Grid>
        </RevealSection>

        {/* Certifications */}
        <RevealSection id="certifications">
          <SecHead
            tag="Certifications"
            title="Certifications"
            subtitle="Continuous learning across cloud, networking, security and programming."
          />
          <Grid className="cert-grid">
            {portfolio.certifications.map((c, i) => {
              const Icon = certIcon(c.category);
              const verified = Boolean(c.credential);
              return (
                <motion.div className="cert-card" key={c.name} variants={fadeUp} whileHover={{ y: -4 }}>
                  <div className="cert-top">
                    <IconTile icon={Icon} />
                    <span className="cert-tag">{certTag(c.category)}</span>
                  </div>
                  <h3 className="cert-name">{c.name}</h3>
                  <p className="cert-meta">
                    {c.issuer} · {c.year}
                  </p>
                  {c.detail && <p className="cert-detail">{c.detail}</p>}
                  <div className="cert-footer">
                    {verified ? (
                      <span className="cert-verified">
                        <BadgeCheck size={15} />
                        Verified Credential
                      </span>
                    ) : (
                      <span className="cert-meta">Earned {c.year}</span>
                    )}
                    {verified && (
                      <a className="cert-link" href={c.credential} target="_blank" rel="noreferrer">
                        View <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </Grid>
        </RevealSection>

        {/* Achievements */}
        <RevealSection id="achievements">
          <SecHead tag="Achievements" title="Achievements" subtitle="Recognition and contributions beyond the classroom." />
          <motion.div className="ach-featured" variants={fadeUp}>
            <div className="ach-featured-icon">
              <Trophy size={38} strokeWidth={1.5} />
            </div>
            <div className="ach-featured-body">
              <p className="ach-featured-kicker">Featured Achievement</p>
              <h3 className="ach-featured-title">{portfolio.achievements[0].title}</h3>
              <p className="ach-featured-text">{portfolio.achievements[0].description}</p>
            </div>
          </motion.div>

          <Grid className="ach-grid">
            {extraAchievements.map((a) => (
              <motion.article className="ach-card" key={a.title} variants={fadeUp} whileHover={{ y: -4 }}>
                <IconTile icon={a.icon} />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </motion.article>
            ))}
          </Grid>
        </RevealSection>

        {/* Currently Exploring */}
        <RevealSection id="exploring" className="exploring">
          <p className="exploring-label">Currently Exploring</p>
          <div className="exploring-wrap">
            <div className="exploring-track">
              {[...exploringItems, ...exploringItems].map((item, i) => (
                <span className="exploring-pill" key={`${item}-${i}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Contact */}
        <RevealSection id="contact" className="contact">
          <div className="contact-glow" aria-hidden="true" />
          <motion.div className="contact-inner" variants={fadeUp}>
            <div>
              <p className="sec-tag">Contact</p>
              <h2 className="contact-heading">
                Let's Build
                <br />
                <span className="accent">Something Useful.</span>
              </h2>
              <p className="contact-msg">Have an idea, opportunity or technical project?</p>
              <div className="contact-cta">
                <a className="btn btn--primary" href={`mailto:${portfolio.email}`}>
                  Let's Connect <Send size={15} />
                </a>
                <a
                  className="btn btn--ghost"
                  href={portfolio.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </div>
              <a className="contact-email" href={`mailto:${portfolio.email}`}>
                <Mail size={18} />
                {portfolio.email}
              </a>
            </div>

            <div className="contact-meta">
              <a className="contact-item" href={portfolio.social.github} target="_blank" rel="noreferrer">
                <IconTile icon={GithubIcon} />
                <span>
                  <span className="contact-item-label">GitHub</span>
                  <span className="contact-item-value">hari002-png</span>
                </span>
              </a>
              <a className="contact-item" href={portfolio.social.linkedin} target="_blank" rel="noreferrer">
                <IconTile icon={LinkedinIcon} />
                <span>
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-value">Hariharasudhan P</span>
                </span>
              </a>
              <div className="contact-item">
                <IconTile icon={MapPin} />
                <span>
                  <span className="contact-item-label">Location</span>
                  <span className="contact-item-value">Coimbatore, Tamil Nadu, India</span>
                </span>
              </div>
            </div>
          </motion.div>
        </RevealSection>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-name">HARIHARASUDHAN P</p>
            <p className="footer-tag">AI × CLOUD × SOFTWARE</p>
          </div>
          <div className="footer-links">
            <a className="footer-link" href={portfolio.social.github} target="_blank" rel="noreferrer">
              <GithubIcon size={15} /> GitHub
            </a>
            <a className="footer-link" href={portfolio.social.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <a className="footer-link" href={`mailto:${portfolio.email}`}>
              <Mail size={15} /> Email
            </a>
          </div>
          <p className="footer-copy">© 2026 Hariharasudhan P</p>
        </div>
      </footer>
    </>
  );
}