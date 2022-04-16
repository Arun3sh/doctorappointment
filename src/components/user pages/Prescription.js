import { useEffect, useState } from 'react';
import { patientAPI } from '../../asset/global';
import './Treatmentrecord.css';

function Prescription() {
	const [prescription, setPrescription] = useState([]);
	const getPrescription = async () => {
		await fetch(`${patientAPI}/prescription/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => {
				data[0].appointments !== undefined
					? setPrescription(data[0].appointments)
					: setPrescription([]);
			});
	};
	useEffect(getPrescription, []);
	return (
		<div className="prescription-wrapper container-sm">
			<div className="prescription-container">
				{prescription.length > 0
					? prescription
							.filter((e) => e.prescription !== '')
							.map(({ date, dr_name, prescription }, index) => (
								<div key={index} className="tr-card">
									<span>
										<h5>Prescription given on </h5>
										<h4>{date}</h4>
									</span>

									<div className="doc-name-div">
										<p className="doc-name">Reviewed By: Dr. {dr_name}</p>
									</div>
									<div className="app-prescription">
										<h3 className="app-pres">Prescription</h3>

										<p className="reason-para">{prescription}</p>
									</div>
								</div>
							))
					: 'Please Book your first appointment'}
			</div>
		</div>
	);
}

export default Prescription;
