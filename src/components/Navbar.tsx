import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

export type NavItem = { label: string; href: string };
export type ThemeTone = 'dark' | 'light';

export interface NavbarProps {
  logo: string;
  nav: NavItem[];
  resumeHref: string;
  tone: ThemeTone;
  onToggleTheme: () => void;
}

const TONE_LABEL: Record<ThemeTone, string> = {
  dark: 'Switch to light mode',
  light: 'Switch to dark mode'
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar({
  logo,
  nav,
  resumeHref,
  tone,
  onToggleTheme
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => active === href.replace('#', '');

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#home" onClick={closeMenu}>
          {logo}
        </a>

        <nav className="navbar-nav" aria-label="Primary">
          <ul className="navbar-nav-list">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  className={`navbar-link${isActive(n.href) ? ' navbar-link--active' : ''}`}
                  href={n.href}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <a
            className="navbar-resume"
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <Download size={14} />
          </a>

          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={TONE_LABEL[tone]}
            aria-pressed={tone === 'light'}
            title={TONE_LABEL[tone]}
          >
            <motion.span
              key={tone}
              className="theme-toggle-icon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {tone === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </button>

          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close navigation' : 'Toggle navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="scrim"
            className="navbar-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            id="mobile-nav-menu"
            className="navbar-menu"
            initial={{ opacity: 0, y: -18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <nav aria-label="Mobile">
              {nav.map((n) => (
                <a
                  key={n.href}
                  className={`navbar-menu-link${isActive(n.href) ? ' navbar-menu-link--active' : ''}`}
                  href={n.href}
                  onClick={closeMenu}
                >
                  <span>{n.label}</span>
                </a>
              ))}
            </nav>

            <div className="navbar-menu-actions">
              <a
                className="navbar-menu-cta"
                href={resumeHref}
                download="Hariharasudhan_P_Resume.pdf"
                onClick={closeMenu}
              >
                <Download size={16} /> Download Resume
              </a>

              <button
                className="navbar-menu-theme"
                onClick={onToggleTheme}
                aria-label={TONE_LABEL[tone]}
              >
                <motion.span
                  key={tone}
                  className="theme-toggle-icon"
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {tone === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
                <span>{tone === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}