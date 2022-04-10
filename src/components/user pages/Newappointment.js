import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Newappointment.css';
import moment from 'moment';
import ms from 'ms';

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

	const timeSlot = ['10', '10.30', '11', '11.30', '3.30', '4', '4.30', '5'];
	const [selectTime, setSelectTime] = useState('Choose Time');
	console.log(min_date, max_date, minDate, maxDate);
	return (
		<div className="newappointment-wrapper container">
			<div className="newappointment-container">
				<h4>Book New Appointment</h4>
				<form>
					<p>MyName</p>
					<p>My Dept</p>
					<TextField multiline maxRows={4} label="Reason Of Visit" variant="filled" />
					<input type={'date'} min={minDate} max={maxDate} />

					<Select
						className="select-input"
						id="demo-simple-select"
						value={selectTime}
						onChange={(e) => setSelectTime(e.target.value)}
					>
						<MenuItem value={'Choose Time'} selected disabled>
							Choose Time
						</MenuItem>
						{timeSlot.map((e) => (
							<MenuItem value={e}>{e}</MenuItem>
						))}
					</Select>

					{/* Book and go back button */}
					<div className="btns-div">
						<Button variant="outlined">Book Now</Button>
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
