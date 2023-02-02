import { Navigate, Route, Routes } from 'react-router-dom';
import Provider from './app/application/Provider';
import LayoutView from './app/pages/layout/LayoutView';
import './App.css';
import LoginView from './app/pages/login/Login';
import Loading from './app/components/loading/loading/Loading';

function App() {
	return (
		<Provider>
			<Routes>
				<Route path='/' element={<Navigate to='login' />} />
				<Route
					path='/login'
					element={<LoginView data-testid='login-component' />}
				/>
				<Route path='/layout/*' element={<LayoutView />} />
			</Routes>
			<Loading />
		</Provider>
	);
}

export default App;
