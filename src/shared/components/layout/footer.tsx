import { cn } from '@/shared/lib/utils';
import { Container } from './container';

/* ------------------------------------------------------------------ */
/*  Social Icon Placeholder                                            */
/* ------------------------------------------------------------------ */

interface SocialIconProps {
  /** Accessible label for the social link. */
  label: string;
  /** URL of the social profile. */
  href: string;
  /** SVG path data for the icon. */
  pathData: string;
}

function SocialIcon({ label, href, pathData }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg',
        'text-text-secondary',
        'transition-all duration-200',
        'hover:bg-primary/10 hover:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={pathData} />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick-link data                                                    */
/* ------------------------------------------------------------------ */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

const QUICK_LINKS: FooterLinkGroup[] = [
  {
    title: 'For Job Seekers',
    links: [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Companies', href: '/companies' },
      { label: 'Career Advice', href: '/advice' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Social icon SVG paths (placeholders)                               */
/* ------------------------------------------------------------------ */

const SOCIAL_LINKS: SocialIconProps[] = [
  {
    label: 'Twitter / X',
    href: '#',
    pathData:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    pathData:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: '#',
    pathData:
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
];

/* ------------------------------------------------------------------ */
/*  Footer Component                                                   */
/* ------------------------------------------------------------------ */

/**
 * Footer — the application footer with branding, quick links,
 * social icons, and copyright notice.
 *
 * Features:
 * - Responsive grid layout (stacks on mobile, 3-column on desktop)
 * - Product logo and short description
 * - Quick-link groups
 * - Social icon placeholders
 * - Copyright with dynamic year
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <Footer />
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-border',
        'bg-surface',
      )}
    >
      <Container padding="md" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Brand Column ---- */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              className={cn(
                'group mb-4 inline-flex items-center gap-2.5',
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

              <span className="text-lg font-bold text-text-primary">
                Job
                <span className="text-primary">Sphere</span>
              </span>
            </a>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              Your gateway to discovering meaningful career opportunities.
              Connect with top companies and find the role that fits you.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-1" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>

          {/* ---- Quick Link Columns ---- */}
          {QUICK_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-sm text-text-secondary',
                        'transition-colors duration-200',
                        'hover:text-primary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                        'rounded-sm',
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ---- Newsletter / CTA Column (placeholder) ---- */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Stay Updated
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              Get the latest job listings and career tips delivered to your inbox.
            </p>
          </div>
        </div>
      </Container>

      {/* ---- Bottom Bar ---- */}
      <div className="border-t border-border">
        <Container
          padding="md"
          className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row"
        >
          <p className="text-xs text-text-secondary">
            &copy; {currentYear} JobSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/terms"
              className={cn(
                'text-xs text-text-secondary',
                'transition-colors duration-200 hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'rounded-sm',
              )}
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className={cn(
                'text-xs text-text-secondary',
                'transition-colors duration-200 hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'rounded-sm',
              )}
            >
              Privacy Policy
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export { Footer };
