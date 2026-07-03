import { MainLayout } from '@/shared/components/layout';
import { Container } from '@/shared/components/layout';

/**
 * Root application component.
 *
 * Wraps all page content inside the shared MainLayout shell
 * (Navbar + main content slot + Footer).
 *
 * Placeholder content is displayed until actual pages and routing
 * are implemented in a later phase.
 */
function App() {
  return (
    <MainLayout>
      <Container as="section" padding="md" className="py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JobSphere
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            Your gateway to discovering meaningful career opportunities.
            Connect with top companies and find the role that fits you.
          </p>
        </div>
      </Container>
    </MainLayout>
  );
}

export default App;
