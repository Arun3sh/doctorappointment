import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './components/user pages/Login';
import Appointment from './components/user pages/Appointment';

export const authContext = createContext(null);

function App() {
	const [login, setLogin] = useState(false);
	const location = useLocation();

	const variables = {
		login: login,
		setLogin: setLogin,
	};

	return (
		<authContext.Provider value={variables}>
			<div className="App">
				{location.pathname === '/register' || location.pathname === '/login' ? '' : <Navigation />}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/register">register</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/appointment">
						<Appointment />
					</Route>
					<Route path="/**">Error</Route>
				</Switch>
				{location.pathname === '/register' || location.pathname === '/login' ? '' : <Footer />}
			</div>
		</authContext.Provider>
	);
}

export default App;
