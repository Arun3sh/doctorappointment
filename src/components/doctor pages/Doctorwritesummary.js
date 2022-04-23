import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doctorAPI } from '../../asset/global';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Doctorwritesummary() {
	const [aptm, setAptm] = useState([]);

	const today = new Date();
	const date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
	const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
	const year = today.getFullYear();
	const present = year + '-' + month + '-' + date;

	// To get all appointments of patient
	const getAptm = async () => {
		await fetch(`${doctorAPI}/appointments/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((d) => setAptm(d.appointments.reverse()));
	};
	useEffect(getAptm, []);
	return (
		<div className="doctorwritesummary-wrapper container-sm" style={{ marginTop: '90px' }}>
			<div className="doctorwritesummary-container" style={{ minHeight: '90vh' }}>
				{aptm.filter((e) => e.status === 'Approved' && e.date <= present).length > 0 ? (
					<AppointmentCard aptm={aptm} present={present} />
				) : (
					'No entries yet'
				)}
			</div>
		</div>
	);
}

function AppointmentCard({ aptm, present }) {
	const history = useHistory();
	const writeSummaryPre = async () => {
		await fetch(`${doctorAPI}/update-appointment-summary/${localStorage.getItem('id')}`, {
			method: 'PUT',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json',
				'x-auth-token': ` ${localStorage.getItem('token')}`,
			},
		});
	};

	const formValidationSchema = yup.object({
		summary: yup.string().required('Summary Required'),
		prescription: yup.string().required('Prescription Required'),
	});

	const { values, errors, handleChange, handleBlur, handleSubmit, touched } = useFormik({
		initialValues: {
			id: '',
			date: '',
			summary: '',
			prescription: '',
			timeslot: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			writeSummaryPre(values);
			history.push('/');
		},
	});

	return (
		<div className="appointments">
			{aptm
				.filter((e) => e.status === 'Approved' && e.date <= present)
				.map(
					(
						{ pt_id, pt_name, pt_reason, date, discharge_summary, prescription, timeslot },
						index
					) => (
						<div className="appointment-card" key={index}>
							<p style={{ display: 'none' }}>{(values.id = pt_id)}</p>

							<h4 className="date-time">
								{(values.date = date)} @ {(values.timeslot = timeslot)}
							</h4>
							<p className="doc-name">{pt_name}</p>
							<p className="app-para">Reason of Visit: {pt_reason}</p>
							<div
								className="doc-textfield"
								style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
							>
								{discharge_summary.length > 1 ? (
									<p>{discharge_summary}</p>
								) : (
									<TextField
										style={{ marginTop: '15px' }}
										multiline
										rows={5}
										label="summary"
										variant="outlined"
										id="summary"
										name="summary"
										value={values.summary}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.summary && touched.summary}
										helperText={errors.summary && touched.summary ? errors.summary : ''}
									/>
								)}

								{prescription.length > 1 ? (
									<p>{prescription}</p>
								) : (
									<TextField
										style={{ margin: '15px 0px' }}
										multiline
										rows={5}
										label="prescription"
										variant="outlined"
										id="prescription"
										name="prescription"
										value={values.prescription}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.prescription && touched.prescription}
										helperText={
											errors.prescription && touched.prescription ? errors.prescription : ''
										}
									/>
								)}
							</div>
							{discharge_summary.length > 1 && prescription.length > 1 ? (
								''
							) : (
								<div className="app-btns">
									<Button variant="outlined" color="error" onClick={() => history.goBack()}>
										Cancel
									</Button>
									<Button variant="outlined" onClick={handleSubmit}>
										Submit
									</Button>
								</div>
							)}
						</div>
					)
				)}
		</div>
	);
}

export default Doctorwritesummary;
