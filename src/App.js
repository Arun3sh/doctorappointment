import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/user pages/userpages.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './components/user pages/Login';

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
				<Route path="/news & event">hi</Route>
				<Route path="/**">Error</Route>
			</Switch>
			{location.pathname === '/register' || location.pathname === '/login' ? '' : <Footer />}
		</div>
	);
}

export default App;
