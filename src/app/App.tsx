import { AppRouter } from './router';

/**
 * Root application component.
 *
 * Renders the HomePage which composes the MainLayout shell
 * with landing page sections. Routing will be added in a later phase.
 */
function App() {
  return <AppRouter />;
}

export default App;
