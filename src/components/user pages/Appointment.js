import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './Appointment.css';

function Appointment() {
	const history = useHistory();

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
				</div>
			</div>
		</div>
	);
}

export default Appointment;
