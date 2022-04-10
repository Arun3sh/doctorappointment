import { Button, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Createappointment.css';

function Createappointment() {
	const [selectDoc, setSelectDoc] = useState('Choose Dept');
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
			dept: 'Cardiologist',
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
						{docList.map(({ dept }) => (
							<MenuItem value={dept}>{dept}</MenuItem>
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
			{docList.map(({ name, dept, about }, index) => (
				<div className="doc-info" key={index}>
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
		</div>
	);
}
export default Createappointment;
