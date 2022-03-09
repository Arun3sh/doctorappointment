import { useHistory } from 'react-router-dom';

function Footer() {
	const history = useHistory();
	const mytry = [
		{
			name: 'About Us',
			data: ['Leadership', 'Panel', 'Gallery', 'News & Event'],
		},
		{
			name: 'Privacy & Terms',
			data: ['Terms & Use', 'Privacy policy', 'Disclosures', 'Disclaimers'],
		},
		{
			name: 'Our Solutions',
			data: ['Onsite Clinics', 'Preventive Care', 'Wellness Program'],
		},
	];

	return (
		<footer className="footer-wrapper container-sm">
			<div className="row myFooter">
				{mytry.map(({ name, data }, index) => (
					<div className="col-sm-3" key={index}>
						<h4 className="footer-heading">{name}</h4>
						<ul className="footer-list">
							{data.map((d, index) => (
								<li
									className="list-item"
									key={index}
									style={{ cursor: 'pointer' }}
									onClick={() => history.push(`/${d.toLowerCase()}`)}
								>
									{d}
								</li>
							))}
						</ul>
					</div>
				))}

				<div className="col-sm-3">
					<h4 className="footer-heading">Contact Us</h4>
					<ul className="footer-list">
						<li className="list-item">Healthcare System</li>
						<li className="list-item">Our Main Branch Address</li>
						<li className="list-item">Our Contact number</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
