import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { patientAPI } from '../../asset/global';
import './Appointment.css';

function Appointment() {
	const history = useHistory();
	const [cancel, setCancel] = useState('no');
	const [aptm, setAptm] = useState([]);

	// To get all appointments of patient
	const getAptm = async () => {
		await fetch(`${patientAPI}/appointment/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then(
				(d) =>
					setCancel('no') & setAptm(d.appointments !== undefined ? d.appointments.reverse() : [])
			);
	};
	useEffect(getAptm, [cancel]);

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
				{aptm.length > 0 ? (
					<AppointmentCard aptm={aptm} setCancel={setCancel} />
				) : (
					'Please Book Your appointment'
				)}
			</div>
		</div>
	);
}

function AppointmentCard({ aptm, setCancel }) {
	const cancelAppointment = async (date) => {
		await fetch(`${patientAPI}/update-appointment-status/${localStorage.getItem('id')}`, {
			method: 'PUT',
			body: JSON.stringify({ date: date, status: 'cancelled' }),
			headers: {
				'Content-type': 'application/json',
				'x-auth-token': ` ${localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				toast.success('Appointment Cancelled');
				setCancel('true');
			})
			.catch((err) => toast.error('Invalid Request'));
	};

	return (
		<div className="appointments">
			{aptm.map(({ dr_name, pt_reason, date, timeslot, status }, index) => (
				<div className="appointment-card" key={index}>
					<h4 className="date-time">
						{date} @ {timeslot}
					</h4>
					<div className="doc-name-div">
						<p className="doc-name">Dr. {dr_name}</p>
					</div>
					<div className="app-reason">
						<p className="app-para">Reason of Visit: </p>
						<p className="reason-para">{pt_reason}</p>
					</div>
					<div className="app-status">
						<h5>Status: {status}</h5>
					</div>

					{/* Cancel and reschedule options for patients */}
					{status !== 'pending' ? (
						''
					) : (
						<div className="app-btns">
							<Button variant="outlined" color="error" onClick={() => cancelAppointment(date)}>
								Cancel
							</Button>
							<Button variant="outlined">Reschedule</Button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default Appointment;
