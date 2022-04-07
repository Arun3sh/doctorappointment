import docIllu from '../../asset/images/doctor-in-phone.png';
import {
	Button,
	FormControl,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

function Login() {
	const history = useHistory();
	return (
		<div className="container-sm login-wrapper">
			<div className="login-title">
				<h3>WELCOME</h3>
				<p>please login</p>
			</div>
			<div className="login-container">
				{/* <div className="for-svg"> */}
				<img className="login-img" src={docIllu} aria-label="user illustration" alt="broken" />
				{/* </div> */}
				<div className="login-container-form">
					<form className="login-form">
						{/* select radio options for doctor patient login */}
						<FormControl>
							<RadioGroup
								className="radioGroup-userType"
								aria-label="type of user"
								defaultValue="patient"
								name="type-user"
							>
								<FormControlLabel value="patient" control={<Radio />} label="Patient" />
								<FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
							</RadioGroup>
						</FormControl>

						<div className="login-form-div">
							<TextField variant="standard" label="email id" autoFocus="yes" />
							<TextField variant="standard" label="password" type="password" />
							<div className="submit-user">
								<Button variant="outlined" color="error" onClick={() => history.goBack()}>
									Back
								</Button>
								<Button variant="outlined">Submit</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default Login;
