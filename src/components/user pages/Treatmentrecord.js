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
			.then((data) => setSummary(data[0].appointments));
	};
	useEffect(getSummary, []);
	return (
		<div className="treatment-record-wrapper container-sm">
			<div className="treatment-record-container">
				{summary
					.filter((e) => e.discharge_summary !== '')
					.map(({ date, dr_name, discharge_summary }, index) => (
						<div key={index} className="tr-card">
							<span>
								Summary on <h3>{date}</h3>
							</span>
							<p>Reviewed By:</p> <h3>{dr_name}</h3>
							<h3>Summary</h3>
							<p>{discharge_summary}</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default Treatmentrecord;
