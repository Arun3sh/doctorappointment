import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Navigation() {
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
					</Nav>

					{/* Login Button */}
					<Button
						className="login-btn"
						variant="text"
						color="primary"
						onClick={() => history.push('/login')}
					>
						Login
					</Button>

					{/* Signup Button */}
					<Button
						className="signup-btn"
						variant="contained"
						color="success"
						onClick={() => history.push('/register')}
					>
						Sign up
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
