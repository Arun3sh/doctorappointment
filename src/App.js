import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './components/user pages/Login';
import Appointment from './components/user pages/Appointment';

function App() {
	const [login, setLogin] = useState(false);
	const location = useLocation();

	return (
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
	);
}

export default App;
