import type { ReactNode } from 'react';
import { Navbar } from './navbar';
import type { NavbarProps } from './navbar';
import { Footer } from './footer';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MainLayoutProps {
  /** The page content rendered between the Navbar and Footer. */
  children: ReactNode;
  /**
   * Props forwarded to the Navbar.
   * Allows consumers to inject custom links or an auth slot
   * without modifying the layout itself.
   */
  navbarProps?: NavbarProps;
}

/* ------------------------------------------------------------------ */
/*  MainLayout Component                                               */
/* ------------------------------------------------------------------ */

/**
 * MainLayout — the shared application shell.
 *
 * Composes the Navbar, a flexible main content area, and the Footer
 * into a full-height layout using CSS Flexbox.
 *
 * The content area uses `flex-1` so the footer is always pushed to the
 * bottom of the viewport, even on pages with minimal content.
 *
 * No routing, authentication, or Firebase — purely structural.
 *
 * @example
 * // Basic usage
 * <MainLayout>
 *   <Container>
 *     <h1>Welcome to JobSphere</h1>
 *   </Container>
 * </MainLayout>
 *
 * // With custom navbar props
 * <MainLayout navbarProps={{ authSlot: <UserAvatar /> }}>
 *   <DashboardPage />
 * </MainLayout>
 */
function MainLayout({ children, navbarProps }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar {...navbarProps} />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export { MainLayout };
export type { MainLayoutProps };
