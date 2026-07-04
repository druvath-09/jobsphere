import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Button, Logo } from '@/shared/components/ui';
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
   */
  links?: NavLink[];
  /**
   * Slot for authenticated user actions (avatar, dropdown, etc.).
   */
  authSlot?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Default navigation links                                           */
/* ------------------------------------------------------------------ */

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
];

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
 */
function Navbar({ links = DEFAULT_LINKS, authSlot }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

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
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border/50 transition-all duration-300"
    >
      <Container as="div" padding="md" className="flex h-14 items-center justify-between">

        {/* ---- Logo ---- */}
        <Logo />

        {/* ---- Desktop Navigation ---- */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover/50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-250",
                  isActive ? "after:w-full" : "hover:after:w-2/3"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ---- Desktop Actions ---- */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/employers"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors mr-2"
          >
            For Employers
          </Link>
          
          <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />

            {authSlot ?? (
              <>
                <Link to="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-surface-hover/50 hover:text-text-primary h-9 px-3 text-text-secondary">
                  Login
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
                  Register
                </Link>
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
            <ul className="flex flex-col gap-1" role="list">
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                        isActive ? 'bg-primary/5 text-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      )}
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Link
              to="/employers"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors text-center py-2"
              onClick={closeMobile}
            >
              For Employers
            </Link>
            
            {authSlot ?? (
              <>
                <Link to="/login" className="inline-flex w-full items-center justify-center rounded-md border border-border bg-transparent text-sm font-medium hover:bg-surface-hover/50 hover:text-text-primary h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" onClick={closeMobile}>
                  Login
                </Link>
                <Link to="/register" className="inline-flex w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" onClick={closeMobile}>
                  Register
                </Link>
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
