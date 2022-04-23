import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './../user pages/register.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { doctorAPI } from '../../asset/global';
import { toast } from 'react-toastify';

function Createdoctor() {
	const history = useHistory();

	const register = async (values) => {
		// To make sure same user exists
		await fetch(`${doctorAPI}/create-doctor`, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json',
				'x-adminauth-token': ` ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				if (res.ok) {
					history.goBack();
					toast.success('Account Created');
				} else {
					toast.error('Doctor Email already exists!');
				}
			})
			.catch(() => toast.error('Error occured please try later'));
	};

	const formValidationSchema = yup.object({
		name: yup.string().min(4).required('please enter your name'),
		contact: yup.string().required('Please add your contact info'),
		email: yup.string().email().required('email id is required'),
		password: yup
			.string()
			.required('Min 8 characters')
			.matches(
				/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),
	});
	const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
		initialValues: {
			name: '',
			dept: '',
			about: '',
			contact: '',
			email: '',
			password: '',
			timeslot: ['10', '10.30', '11', '11.30', '3', '3.30', '4', '4.30'],
		},
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			register(values);
			// resetForm();
		},
	});

	return (
		<div className="createdoctor-wrapper container-sm" style={{ marginTop: '90px' }}>
			<div className="createdoctor-container">
				<div className="logo-title">
					<h2>HealthCare</h2>
				</div>
				<div className="register-wrapper">
					<h3>Create an Account</h3>

					<form className="registeruser-form" onSubmit={handleSubmit} autoComplete="off">
						<TextField
							id="name"
							name="name"
							value={values.name}
							label="Doctor Name"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.name && touched.name}
							helperText={errors.name && touched.name ? errors.name : ''}
						/>
						<TextField
							id="email"
							name="email"
							value={values.email}
							label="Enter email id"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.email && touched.email}
							helperText={errors.email && touched.email ? errors.email : ''}
						/>
						<TextField
							id="dept"
							name="dept"
							value={values.dept}
							label="Enter Department"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.dept && touched.dept}
							helperText={errors.dept && touched.dept ? errors.dept : ''}
						/>
						<TextField
							id="contact"
							name="contact"
							value={values.contact}
							label="contact"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.contact && touched.contact}
							helperText={errors.contact && touched.contact ? errors.contact : ''}
						/>
						<TextField
							id="about"
							name="about"
							value={values.about}
							type="text"
							multiline
							rows={4}
							label="About"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.about && touched.about}
							helperText={errors.about && touched.about ? errors.about : ''}
						/>
						<TextField
							id="password"
							name="password"
							value={values.password}
							type="password"
							label="Set Password"
							variant="outlined"
							style={{ width: '40vh' }}
							onChange={handleChange}
							onBlur={handleBlur}
							error={errors.password && touched.password}
							helperText={errors.password && touched.password ? errors.password : ''}
						/>

						<Button variant="outlined" type="submit" color="success">
							Submit
						</Button>
						<Button variant="outlined" color="error" onClick={() => history.goBack()}>
							Cancel
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Createdoctor;
