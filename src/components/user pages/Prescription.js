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
			.then((data) => setPrescription(data[0].appointments));
	};
	useEffect(getPrescription, []);
	return (
		<div className="prescription-wrapper container-sm">
			<div className="prescription-container">
				{prescription
					.filter((e) => e.prescription !== '')
					.map(({ date, dr_name, prescription }, index) => (
						<div key={index} className="tr-card">
							<span>
								Prescription given on <h3>{date}</h3>
							</span>
							<p>Reviewed By:</p> <h3>{dr_name}</h3>
							<h3>Summary</h3>
							<p>{prescription}</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default Prescription;
