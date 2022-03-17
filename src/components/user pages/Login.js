import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';

function Login() {
	return (
		<div className="container-sm login-wrapper">
			<div className="login-container">
				<h3>Login</h3>
				<form className="login-form">
					{/* select radio options for doctor patient login */}
					<FormControl>
						{/* <FormLabel id="type-user">Choose Type</FormLabel> */}
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
						<TextField variant="outlined" label="email id" />
						<TextField variant="outlined" label="password" type="password" />
						<div className="submit-user">
							<Button variant="contained">Submit</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Login;
