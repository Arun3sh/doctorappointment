import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
	return (
		<div className="App">
			<Navigation />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/news & event">hi</Route>
				<Route path="/**">Error</Route>
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
