import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui';
import { Container } from './container';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavLink {
  /** Display label for the navigation link. */
  label: string;
  /** Target URL or route path. */
  href: string;
}

interface NavbarProps {
  /**
   * Override the default navigation links.
   * Defaults to Jobs, Companies, About, Contact.
   */
  links?: NavLink[];
  /**
   * Slot for authenticated user actions (avatar, dropdown, etc.).
   * When provided, replaces the guest Login/Register buttons.
   * This keeps the component extensible without refactoring.
   */
  authSlot?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Default navigation links                                           */
/* ------------------------------------------------------------------ */

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ------------------------------------------------------------------ */
/*  Search Icon                                                        */
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/*  Hamburger Icon                                                     */
/* ------------------------------------------------------------------ */

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar Component                                                   */
/* ------------------------------------------------------------------ */

/**
 * Navbar — the primary application navigation bar.
 *
 * Minimal, no glassmorphism. Clean bottom border. Sticky top.
 * Extensible auth slot for future authenticated navigation.
 */
function Navbar({ links = DEFAULT_LINKS, authSlot }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  /* Close mobile menu on Escape */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobile();
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-surface border-b border-border"
    >
      <Container as="div" padding="md" className="flex h-14 items-center justify-between">

        {/* ---- Logo ---- */}
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2 rounded-md',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          )}
          aria-label="JobSphere — Home"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-white" style={{ fontFamily: 'monospace' }}>
              {'</>'}
            </span>
          </div>
          <span className="text-base font-semibold text-text-primary tracking-tight">
            JobSphere
          </span>
        </Link>

        {/* ---- Desktop Navigation ---- */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium text-text-secondary',
                'transition-colors duration-150',
                'hover:text-text-primary hover:bg-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ---- Desktop Actions ---- */}
        <div className="hidden items-center gap-2 md:flex">


          {authSlot ?? (
            <>
              <Button variant="ghost" size="sm" className="text-text-secondary font-medium">
                Login
              </Button>
              <Button variant="primary" size="sm">
                Register
              </Button>
            </>
          )}
        </div>

        {/* ---- Mobile Menu Toggle ---- */}
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <HamburgerIcon open={mobileOpen} />
        </Button>
      </Container>

      {/* ---- Mobile Navigation Panel ---- */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed inset-x-0 top-14 bottom-0 z-40 md:hidden',
          'bg-surface border-t border-border',
          'transition-all duration-200 ease-out',
          mobileOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <Container padding="md" className="flex flex-col gap-1 pt-3 pb-6">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-0.5" role="list">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      'flex items-center rounded-md px-3 py-2.5 text-sm font-medium',
                      'text-text-secondary transition-colors duration-150',
                      'hover:bg-background hover:text-text-primary',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    )}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {authSlot ?? (
              <>
                <Button variant="outline" size="md" className="w-full justify-center">
                  Login
                </Button>
                <Button variant="primary" size="md" className="w-full justify-center">
                  Register
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}

export { Navbar };
export type { NavbarProps, NavLink };
