import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../App';

function Navigation() {
	const { login, setLogin, value, setValue } = useContext(authContext);
	const history = useHistory();

	return (
		<Navbar className="myNavbar" expand="sm" bg="light">
			<Container>
				{/* Brand name and logo */}
				<Navbar.Brand>
					<Link to="/">HealthCare</Link>
				</Navbar.Brand>

				<Navbar.Toggle />

				{/* For hamburger menu */}
				<Navbar.Collapse className="navbar-Collapse">
					<Nav>
						{value === 'patient' ? (
							<>
								<Nav.Link className="nav-link">Panel</Nav.Link>
								<Nav.Link className="nav-link">Services</Nav.Link>
								<Nav.Link className="nav-link">About</Nav.Link>
								<Nav.Link className="nav-link">Solution</Nav.Link>
							</>
						) : (
							''
						)}

						{/* Once user is logged in they can see this specific menu to help them navigate to medical space */}
						{login ? (
							value === 'patient' ? (
								<NavDropdown title="Medical Records" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/appointment">
										Appointment
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/treatment-record">
										Treatment Record
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/prescription">
										Prescription
									</NavDropdown.Item>
								</NavDropdown>
							) : value === 'doctor' ? (
								<NavDropdown title="Medical Records" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/appointment">
										View Appointments
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/treatment-record">
										Write Summary
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<NavDropdown title="Doctor Options" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/create-doctor">
										Create Doctor
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/view-doctor-record">
										View Doctor Record
									</NavDropdown.Item>
								</NavDropdown>
							)
						) : (
							''
						)}
					</Nav>

					{/* Login & Logout Button */}
					{!login ? (
						<Button
							className="login-btn"
							variant="text"
							color="primary"
							onClick={() => history.push('/login')}
						>
							Login
						</Button>
					) : (
						<Button
							className="login-btn"
							variant="text"
							color="primary"
							onClick={() =>
								setLogin(!login) & localStorage.clear() & setValue('patient') & history.push('/')
							}
						>
							Logout
						</Button>
					)}

					{/* Signup Button & User avatar after login*/}
					{!login ? (
						<Button
							className="signup-btn"
							variant="contained"
							color="success"
							onClick={() => history.push('/register')}
						>
							Sign up
						</Button>
					) : (
						<Avatar src="/broken-image.jpg" />
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
