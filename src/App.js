import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './components/user pages/Login';
import Appointment from './components/user pages/Appointment';
import Createappointment from './components/user pages/Createappointment';
import Newappointment from './components/user pages/Newappointment';
import { Redirect } from 'react-router-dom';
import Treatmentrecord from './components/user pages/Treatmentrecord';
import Prescription from './components/user pages/Prescription';
import Doctorappointment from './components/doctor pages/Doctorappointment';
import Doctorwritesummary from './components/doctor pages/Doctorwritesummary';
import Register from './components/user pages/Register';
import Createdoctor from './components/admin pages/Createdoctor';
import Viewdoctor from './components/admin pages/Viewdoctor';

export const authContext = createContext(null);

function App() {
	const [login, setLogin] = useState(false);
	const [value, setValue] = useState('patient');

	const location = useLocation();

	const variables = {
		login: login,
		setLogin: setLogin,
		value: value,
		setValue: setValue,
	};

	return (
		<authContext.Provider value={variables}>
			<div className="App">
				{location.pathname === '/register' || location.pathname === '/login' ? '' : <Navigation />}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/register">
						<Register />
					</Route>

					<Route path="/login">
						<Login />
					</Route>
					<Route path="/create-doctor">
						<Createdoctor />
					</Route>
					<Route path="/view-doctor-record">
						<Viewdoctor />
					</Route>
					<Route path="/appointment">
						{/* Here after redirect check if doctor then use <Doctorappointment/> like that */}
						{login ? (
							value === 'patient' ? (
								<Appointment />
							) : value === 'doctor' ? (
								<Doctorappointment />
							) : (
								<Redirect to="/login" />
							)
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/create-appointment">
						{login ? (
							value === 'patient' ? (
								<Createappointment />
							) : (
								<Redirect to="/login" />
							)
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/create-new-appointment/:id">
						<Newappointment />
					</Route>
					<Route path="/treatment-record">
						{login ? (
							value === 'patient' ? (
								<Treatmentrecord />
							) : value === 'doctor' ? (
								<Doctorwritesummary />
							) : (
								<Redirect to="/login" />
							)
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="/prescription">
						<Prescription />
					</Route>
					<Route path="/**">Error</Route>
				</Switch>
				{location.pathname === '/register' || location.pathname === '/login' ? '' : <Footer />}
			</div>
		</authContext.Provider>
	);
}

export default App;
