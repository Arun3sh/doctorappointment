import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Newappointment.css';
import moment from 'moment';
import ms from 'ms';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { patientAPI } from '../../asset/global';

// toast.configure();

function Newappointment() {
	const history = useHistory();

	// For getting current date
	const maxsec = ms('5 days');
	const minsec = ms('1d');
	const today = new Date();
	const date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
	const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
	const year = today.getFullYear();
	const present = year + '-' + month + '-' + date;
	const min_date = new Date(+new Date(present) + minsec);
	const max_date = new Date(+new Date(present) + maxsec);

	const minDate = moment(min_date).format('YYYY-MM-DD');
	const maxDate = moment(max_date).format('YYYY-MM-DD');

	const timeSlot = localStorage.getItem('timeslot').split(',');
	const [selectTime, setSelectTime] = useState('Choose Time');

	const createNewAppointment = async () => {
		await fetch(`${patientAPI}/create-new-appointment/${localStorage.getItem('id')}`, {
			method: 'PUT',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json',
				'x-auth-token': ` ${localStorage.getItem('token')}`,
			},
		}).then(() => {
			toast.success('Appointment created!');
			history.push('/appointment');
		});
	};

	const formValidationSchema = yup.object({
		pt_reason: yup.string().required('Please enter a reason'),
	});

	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			doc_id: localStorage.getItem('doc_id'),
			date: '',
			timeslot: selectTime,
			status: 'pending',
			dr_name: localStorage.getItem('dr_name'),
			pt_name: localStorage.getItem('pt_name'),
			pt_reason: '',
			discharge_summary: '',
			prescription: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: () => {
			values.date === ''
				? toast.error('All fields are required')
				: values.timeslot === 'Choose Time'
				? toast.error('All fields are required')
				: createNewAppointment(values); //Function call needed here
			console.log(values);
		},
	});

	return (
		<div className="newappointment-wrapper container">
			<div className="newappointment-container">
				<h4>Book New Appointment</h4>
				<form className="app-book-form" onSubmit={handleSubmit}>
					<p>Appointment with</p>
					<h4>Dr. {values.dr_name}</h4>
					<p>{localStorage.getItem('dept')}</p>

					{/* User has to fill these */}

					<TextField
						multiline
						maxRows={4}
						label="Reason Of Visit"
						variant="filled"
						id="pt_reason"
						name="pt_reason"
						value={values.pt_reason}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.pt_reason && touched.pt_reason}
						helperText={errors.pt_reason && touched.pt_reason ? errors.pt_reason : ''}
					/>

					<input
						type={'date'}
						min={minDate}
						max={maxDate}
						id="date"
						name="date"
						onChange={(e) => (values.date = e.target.value)}
					/>

					{/* For selecting time slot */}
					<Select
						className="select-input"
						id="timeslot"
						name="timeslot"
						value={values.timeslot}
						onChange={(e) => setSelectTime(e.target.value) & (values.timeslot = e.target.value)}
					>
						<MenuItem value={'Choose Time'} selected disabled>
							Choose Time
						</MenuItem>
						{timeSlot.map((e, index) => (
							<MenuItem key={index} value={e}>
								{e}
							</MenuItem>
						))}
					</Select>

					{/* Book and go back button */}
					<div className="btns-div">
						<Button variant="outlined" type="submit">
							Book Now
						</Button>
						<Button variant="outlined" color="error" onClick={() => history.goBack()}>
							Back
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Newappointment;
