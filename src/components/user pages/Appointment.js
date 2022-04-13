import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { patientAPI } from '../../asset/global';
import './Appointment.css';

function Appointment() {
	const history = useHistory();
	const [aptm, setAptm] = useState([]);

	// To get all appointments of patient
	const getAptm = async () => {
		await fetch(`${patientAPI}/appointment/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((d) => setAptm(d.appointments.reverse()));
	};
	useEffect(getAptm, []);

	return (
		<div className="appointment-wrapper container-sm">
			<div className="appointment-container">
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
				{aptm.length > 0 ? <AppointmentCard aptm={aptm} /> : 'Please Book Your appointment'}
			</div>
		</div>
	);
}

function AppointmentCard({ aptm }) {
	return (
		<div className="appointments">
			{aptm.map(({ dr_name, pt_reason, date, timeslot, status }, index) => (
				<div className="appointment-card" key={index}>
					<h4 className="date-time">
						{date} @ {timeslot}
					</h4>
					<p className="doc-name">Dr. {dr_name}</p>
					<p className="app-para">Reason of Visit: {pt_reason}</p>
					<h6 className="app-status">Appointment Status: {status}</h6>
					<div className="app-btns">
						<Button variant="outlined" color="error">
							Cancel
						</Button>
						<Button variant="outlined">Reschedule</Button>
					</div>
				</div>
			))}
		</div>
	);
}

export default Appointment;
