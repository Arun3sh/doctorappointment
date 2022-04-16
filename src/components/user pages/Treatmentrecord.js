import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { patientAPI } from '../../asset/global';
import './Treatmentrecord.css';

function Treatmentrecord() {
	const [summary, setSummary] = useState([]);
	const getSummary = async () => {
		await fetch(`${patientAPI}/discharge-summary/${localStorage.getItem('id')}`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) =>
				data[0].appointments !== undefined
					? setSummary(data[0].appointments.reverse())
					: setSummary([])
			);
	};
	useEffect(getSummary, []);
	return (
		<div className="treatment-record-wrapper container-sm">
			<div className="treatment-record-container">
				{summary.length > 0
					? summary
							.filter((e) => e.discharge_summary !== '')
							.map(({ date, dr_name, discharge_summary }, index) => (
								<div key={index} className="tr-card">
									<h4 className="date-time">{date}</h4>
									<div className="doc-name-div">
										<p className="doc-name">Reviewed By: Dr. {dr_name}</p>
									</div>
									<div className="app-summary">
										<p className="app-para">Summary: </p>
										<p className="reason-para">{discharge_summary}</p>
									</div>
								</div>
							))
					: 'Please Book your first appointment'}
			</div>
		</div>
	);
}

export default Treatmentrecord;
