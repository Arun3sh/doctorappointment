import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { doctorAPI } from '../../asset/global';
import { toast } from 'react-toastify';

function Doctorappointment() {
	const [aptm, setAptm] = useState([]);
	const [cancel, setCancel] = useState('no');

	// To get all appointments of patient
	const getAptm = async () => {
		await fetch(`${doctorAPI}/appointments/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((d) => setCancel('no') & setAptm(d.appointments.reverse()));
	};
	useEffect(getAptm, [cancel]);
	return (
		<div className="doctorappointment-wrapper container-sm" style={{ marginTop: '90px' }}>
			<div className="doctorappointment-container" style={{ minHeight: '90vh' }}>
				{aptm.filter((e) => e.status !== 'cancelled').length > 0 ? (
					<AppointmentCard aptm={aptm} setCancel={setCancel} />
				) : (
					'No entries yet'
				)}
			</div>
		</div>
	);
}

function AppointmentCard({ aptm, setCancel }) {
	const updateStatus = async (pt_id, date, status) => {
		await fetch(`${doctorAPI}/update-appointment-status/${localStorage.getItem('id')}`, {
			method: 'PUT',
			body: JSON.stringify({ id: pt_id, date: date, status: status }),
			headers: {
				'Content-type': 'application/json',
				'x-auth-token': ` ${localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				toast.success('Appointment status updated');
				setCancel('yes');
			})
			.catch((err) => toast.error(err));
	};

	return (
		<div className="appointments">
			{aptm
				.filter((e) => e.status !== 'cancelled')
				.map(({ pt_id, pt_name, pt_reason, date, timeslot, status }, index) => (
					<div className="appointment-card" key={index}>
						<h4 className="date-time">
							{date} @ {timeslot}
						</h4>
						<p className="doc-name">{pt_name}</p>
						<p className="app-para">Reason of Visit: {pt_reason}</p>
						{status === 'Approved' ? (
							''
						) : (
							<div className="app-btns">
								<Button
									variant="outlined"
									color="error"
									onClick={() => updateStatus(pt_id, date, 'Denied')}
								>
									Decline
								</Button>
								<Button variant="outlined" onClick={() => updateStatus(pt_id, date, 'Approved')}>
									Accept
								</Button>
							</div>
						)}
					</div>
				))}
		</div>
	);
}

export default Doctorappointment;
