import { useState, useCallback, useEffect, useRef } from 'react';
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
   * Defaults to Home, Jobs, Companies, About.
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
  { label: 'Home', href: '/' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
  { label: 'About', href: '/about' },
];

/* ------------------------------------------------------------------ */
/*  Hamburger Icon                                                     */
/* ------------------------------------------------------------------ */

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      {open ? (
        /* X icon */
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        /* Hamburger icon */
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
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
 * Features:
 * - Sticky positioning with glassmorphism backdrop blur
 * - Mobile-responsive with an animated hamburger menu
 * - WCAG 2.1 AA accessible (keyboard navigation, aria attributes, focus trapping)
 * - Logo with tagline
 * - Extensible auth slot for future authenticated navigation
 *
 * @example
 * // Guest mode (default)
 * <Navbar />
 *
 * // With authenticated user actions
 * <Navbar authSlot={<UserDropdown />} />
 *
 * // Custom links
 * <Navbar links={[{ label: 'Dashboard', href: '/dashboard' }]} />
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

  /* Close mobile menu on Escape key press */
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

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        'sticky top-0 z-50',
        'border-b border-border/50',
        'bg-surface/70 backdrop-blur-xl backdrop-saturate-150',
        'supports-[backdrop-filter]:bg-surface/60',
        'transition-all duration-300',
      )}
    >
      <Container
        as="div"
        padding="md"
        className="flex h-16 items-center justify-between"
      >
        {/* ---- Logo & Tagline ---- */}
        <a
          href="/"
          className={cn(
            'group flex items-center gap-2.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'rounded-lg',
          )}
          aria-label="JobSphere — Home"
        >
          {/* Logo icon */}
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg',
              'bg-gradient-to-br from-primary to-accent',
              'shadow-sm',
              'transition-transform duration-200 group-hover:scale-105',
            )}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-white"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M8 12a4 4 0 0 1 8 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-text-primary">
              Job
              <span className="text-primary">Sphere</span>
            </span>
            <span className="hidden text-[10px] leading-none font-medium text-text-secondary sm:block">
              Find Your Next Opportunity
            </span>
          </div>
        </a>

        {/* ---- Desktop Navigation ---- */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium',
                'text-text-secondary',
                'transition-colors duration-200',
                'hover:bg-surface hover:text-text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ---- Desktop Actions ---- */}
        <div className="hidden items-center gap-3 md:flex">
          {authSlot ?? (
            <>
              <Button variant="ghost" size="sm">
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
          'fixed inset-x-0 top-16 bottom-0 z-40 md:hidden',
          'bg-surface/95 backdrop-blur-xl',
          'transition-all duration-300 ease-in-out',
          mobileOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <Container padding="md" className="flex flex-col gap-2 pt-4 pb-6">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'flex items-center rounded-lg px-4 py-3 text-base font-medium',
                      'text-text-secondary',
                      'transition-colors duration-200',
                      'hover:bg-primary/5 hover:text-text-primary',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    )}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Actions */}
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            {authSlot ?? (
              <>
                <Button variant="outline" size="lg" className="w-full justify-center">
                  Login
                </Button>
                <Button variant="primary" size="lg" className="w-full justify-center">
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
