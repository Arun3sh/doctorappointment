import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<Navbar fixed="top" sticky="top" expand="sm" bg="light">
			<Container>
				<Navbar.Brand href="#">HelathCare</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav>
						<Nav.Link> LOGIN</Nav.Link>
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
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
