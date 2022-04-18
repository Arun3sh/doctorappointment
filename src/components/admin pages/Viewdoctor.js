import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doctorAPI } from '../../asset/global';
import './admin_pages.css';

function Viewdoctor() {
	const [docList, setDocList] = useState([]);

	const getDoctors = async () => {
		await fetch(`${doctorAPI}/`, {
			method: 'GET',
		})
			.then((data) => data.json())
			.then((data) => setDocList(data));
	};
	useEffect(getDoctors, []);

	const deleteDoc = async (_id) => {
		await fetch(`${doctorAPI}/delete-doctor/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				'x-adminauth-token': ` ${localStorage.getItem('token')}`,
			},
		})
			.then((d) => {
				if (d.ok) {
					toast.success('Doctor Data removed');
					getDoctors();
				} else {
					toast.error('Please check your connection');
				}
			})
			.catch((err) => toast.error(err));
	};

	return (
		<div className="view-doctor-wrapper container-sm">
			<div className="view-doctor-container" style={{ marginTop: '90px' }}>
				<div className="view-doc-heading">Doctor List</div>
				<div className="view-doc-li">
					<ul className="view-doc-ul">
						{docList.map(({ _id, name, dept, timeslot }, index) => (
							<li className="doclist-li" key={index}>
								<span className="doc-name">
									Dr. {name} - {dept}
								</span>
								<span>
									<Button variant="text" color="error" onClick={() => deleteDoc(_id)}>
										Delete
									</Button>
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
export default Viewdoctor;
