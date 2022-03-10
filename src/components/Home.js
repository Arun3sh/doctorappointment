import Header from './Header';
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';

function Home() {
	// const myStyle = { backgroundImage: `${imgData[index]}`, height: '350px' };
	return (
		<div className="container-sm home-wrapper">
			<Header />

			{/* About */}
			<div className="about">
				<h3>ABOUT US</h3>
				<p>
					Duis Lorem minim ad excepteur consequat. Est ipsum ullamco excepteur minim cillum labore
					laborum eiusmod amet reprehenderit sint nisi in laborum. Occaecat incididunt est magna
					laborum commodo proident culpa culpa. Exercitation duis qui qui aute pariatur elit.
					Deserunt magna in anim aliqua id. Ea consectetur commodo veniam aliqua excepteur. Nulla
					excepteur ex amet incididunt quis eu cupidatat ipsum amet.
				</p>
			</div>

			{/* Solutions */}
			<div className="solution">
				<h3>DELIVERING IMPACTFUL SOLUTIONS</h3>

				<Solution />
			</div>
		</div>
	);
}

function Solution() {
	const solutionData = [
		{
			title: 'Electronic Record',
			img: 'https://img.freepik.com/free-vector/medical-workers-analyzing-electronic-record_1262-19834.jpg?t=st=1646897702~exp=1646898302~hmac=84aff36f1f87454a0f7a9eb8cb97341011e6e71d21c299c9035e2e6bee1a2b01&w=740',
		},
		{
			title: 'Multi Facility in one place',
			img: 'https://img.freepik.com/free-vector/medical-care-people-fllat-icons-set_1284-11545.jpg?w=740',
		},
		{
			title: 'Online Consultation',
			img: 'https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg?w=740',
		},
		{
			title: 'Wellness Program',
			img: 'https://img.freepik.com/free-vector/isometric-3d-concept-immunity-protection-weak-immune-system-prevention-diet-supplements-vitamins-with-sheild-viruses-around-medical-prevention-human-germ-cartoon-vector-illustration_165932-161.jpg?size=664&ext=jpg',
		},
	];
	return (
		<div className="solution-cardWrapper">
			{solutionData.map(({ title, img }, index) => (
				<Card sx={{ maxWidth: 320 }} className="solution-card" key={index}>
					<CardMedia component="img" height="240" image={img} alt={title} />
					<CardContent>
						<Typography variant="p">
							Exercitation quis magna minim ea consequat occaecat est aliqua aute incididunt ipsum
							officia qui. Proident eiusmod culpa pariatur sit fugiat labore sunt esse eu incididunt
							consectetur et id.
						</Typography>
					</CardContent>
					<CardActions>
						<Button variant="contained">Learn More</Button>
					</CardActions>
				</Card>
			))}
		</div>
	);
}
export default Home;
