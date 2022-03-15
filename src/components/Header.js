import { useEffect, useState } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

function Header() {
	// imgData stores promotional ad images
	const imgData = [
		'https://img.freepik.com/free-photo/female-doctor-with-smart-glasses-touching-virtual-screen-medical-technology_53876-124699.jpg?size=626&ext=jpg',
		'https://img.freepik.com/free-vector/fight-virus-concept_52683-36505.jpg?w=740',
		'https://img.freepik.com/free-vector/online-doctor-concept-ilustration_138527-10.jpg?w=740',
	];

	// To set the index value for slider
	const [index, setIndex] = useState(0);

	// Next func to move the image
	const next = () => {
		setIndex((i) => (i + 1) % imgData.length);
	};

	// Next func to move the image
	const prev = () => {
		setIndex((i) => (i !== 0 ? (i - 1) % imgData.length : (i + 2) % imgData.length));
	};

	// Use effect to call the interval timer and slide the image
	useEffect(() => {
		const timer = setInterval(() => {
			next();
		}, 10000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="header-wrapper">
			<div className="slide-image">
				<img src={imgData[index]} alt="broken" aria-label="promotion" onDragEnd={next} />
			</div>
			<div className="image-slider">
				<div className="prevBtn-container" onClick={prev}>
					<GrLinkPrevious className="prevBtn" />
				</div>
				<div className="nextBtn-container" onClick={next}>
					<GrLinkNext className="nextBtn" />
				</div>
			</div>
		</div>
	);
}
export default Header;
