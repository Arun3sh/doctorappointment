import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './Appointment.css';

function Appointment() {
	const history = useHistory();
	const docList = [
		{
			name: 'Dr. Arun ',
			dept: 'General Surgeon',
			about:
				'Cupidatat esse laboris cupidatat aliqua irure. Amet tempor consequat in tempor. Laboris ullamco quis non culpa esse non aute.',
		},
		{
			name: 'Dr. Janani',
			dept: 'Dentist',
			about:
				'Cupidatat esse laboris cupidatat aliqua irure. Amet tempor consequat in tempor. Laboris ullamco quis non culpa esse non aute.',
		},
		{
			name: 'Dr. Vike',
			dept: 'Diabetics',
			about:
				'Cupidatat esse laboris cupidatat aliqua irure. Amet tempor consequat in tempor. Laboris ullamco quis non culpa esse non aute.',
		},
		{
			name: 'Dr. Sowmiya ',
			dept: 'Pediatrician',
			about:
				'Cupidatat esse laboris cupidatat aliqua irure. Amet tempor consequat in tempor. Laboris ullamco quis non culpa esse non aute.',
		},
	];
	return (
		<div className="appointment-wrapper container-sm">
			<div className="appointment-continer">
				<div className="appointment-title">
					<h3>Appointment History</h3>
					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push('/create-appointment')}
					>
						Get Appointment
					</Button>
					<GetDoctorList docList={docList} />
				</div>
			</div>
		</div>
	);
}

function GetDoctorList({ docList }) {
	const history = useHistory();
	return (
		<>
			{docList.map(({ name, dept, about }) => (
				<div>
					<h4>{name}</h4>
					<p>{dept}</p>
					<p>{about}</p>
					<Button
						variant="outlined"
						color="success"
						onClick={() => history.push('/create-new-appointment')}
					>
						Book Appointment
					</Button>
				</div>
			))}
		</>
	);
}
export default Appointment;
