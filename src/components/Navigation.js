import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../App';

function Navigation() {
	const { login, setLogin } = useContext(authContext);
	const history = useHistory();

	return (
		<Navbar className="myNavbar" expand="sm" bg="light">
			<Container>
				{/* Brand name and logo */}
				<Navbar.Brand>
					<Link to="/">HelathCare</Link>
				</Navbar.Brand>

				<Navbar.Toggle />

				{/* For hamburger menu */}
				<Navbar.Collapse className="navbar-Collapse">
					<Nav>
						<Link className="nav-link" to="/panel">
							Panel
						</Link>
						<Link className="nav-link" to="/services">
							Services
						</Link>
						<Link className="nav-link" to="/about">
							About
						</Link>
						<Link className="nav-link" to="/solution">
							Solution
						</Link>

						{/* Once user is logged in they can see this specific menu to help them navigate to medical space */}
						{login ? (
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
							onClick={() => setLogin(!login) & history.push('/')}
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
