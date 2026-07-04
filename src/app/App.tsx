import { AppProvider } from './providers';
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<AppRouter />
			</AppProvider>
		</BrowserRouter>
	);
}

export default App;
