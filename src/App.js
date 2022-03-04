import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';

function App() {
	return (
		<div className="App container-sm">
			<Navigation />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/**">Error</Route>
			</Switch>
		</div>
	);
}

export default App;
