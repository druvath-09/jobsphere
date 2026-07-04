import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Button, Logo } from '@/shared/components/ui';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface SocialIconProps {
  label: string;
  href: string;
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
        'flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover',
        'text-text-secondary transition-all duration-200',
        'hover:text-primary hover:bg-primary/10 hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d={pathData} />
      </svg>
    </a>
  );
}

const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Jobs', href: '/jobs' },
      { label: 'Companies', href: '/companies' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Career Advice', href: '/advice' },
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIAL_LINKS: SocialIconProps[] = [
  {
    label: 'Twitter / X',
    href: '#',
    pathData: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    pathData: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: '#',
    pathData: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border/60">
      <Container padding="md" className="py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-8">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Logo />

            <p className="mt-4 max-w-sm text-base leading-relaxed text-text-secondary">
              The modern platform for software engineers to discover verified opportunities at the best companies.
            </p>
            
            <div className="mt-2 text-xs font-medium text-text-tertiary">
              v1.0.0 (Production)
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  className="flex-1 h-10 px-3 rounded-lg border border-border/80 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <Button type="submit" variant="primary" className="h-10 px-4 rounded-lg shadow-sm">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-bold text-text-primary">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={cn(
                          'text-sm font-medium text-text-secondary',
                          'transition-all duration-200 hover:text-primary hover:translate-x-1 inline-block',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm font-medium text-text-secondary">
            &copy; {currentYear} JobSphere, Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Privacy</Link>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
