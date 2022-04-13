import { Button, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doctorAPI } from '../../asset/global';
import './Createappointment.css';

function Createappointment() {
	const [selectDoc, setSelectDoc] = useState('Choose Dept');
	const [docList, setDocList] = useState([]);

	const getDoctors = async () => {
		await fetch(`${doctorAPI}/`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setDocList(data));
	};
	useEffect(getDoctors, []);
	return (
		<div className="create-app container">
			<div className="create-app-container">
				<div className="doc-search">
					{/* <InputLabel id="demo-simple-select-standard-label">Dept</InputLabel> */}
					<Select
						className="select-input"
						id="demo-simple-select"
						value={selectDoc}
						onChange={(e) => setSelectDoc(e.target.value)}
					>
						<MenuItem value="Choose Dept" selected disabled>
							Choose Dept
						</MenuItem>
						{docList.map(({ dept }, index) => (
							<MenuItem key={index} value={dept}>
								{dept}
							</MenuItem>
						))}
					</Select>
					<div className="input-search">
						<input
							className="doc-input"
							placeholder="search doctor..."
							aria-label="search doctor"
						/>
						<Button variant="outlined">search</Button>
					</div>
				</div>
				<GetDoctorList docList={docList} />
			</div>
		</div>
	);
}

function GetDoctorList({ docList }) {
	const history = useHistory();
	return (
		<div>
			{docList.map(({ _id, name, dept, about, timeslot }, index) => (
				<div className="doc-info" key={index}>
					<h4>{name}</h4>
					<p>{dept}</p>
					<p>{about}</p>
					<Button
						variant="outlined"
						color="success"
						onClick={() => {
							localStorage.setItem('doc_id', _id);
							localStorage.setItem('dr_name', name);
							localStorage.setItem('dept', dept);
							localStorage.setItem('timeslot', timeslot);
							history.push(`/create-new-appointment/${localStorage.getItem('id')}`);
						}}
					>
						Book Appointment
					</Button>
				</div>
			))}
		</div>
	);
}
export default Createappointment;
