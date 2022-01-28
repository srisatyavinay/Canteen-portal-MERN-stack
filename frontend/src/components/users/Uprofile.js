// import { useState } from "react";
// import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

const Orders = (props) => {

	const navigate = useNavigate();
	const log_user = JSON.parse(localStorage.getItem('curr_user'));

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						value={log_user.bname}
						InputProps={{
							readOnly: true,
						}}
					// onChange={onChangebname}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						value={log_user.bemail}
						InputProps={{
							readOnly: true,
						}}
					// onChange={onChangebemail}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Contact no."
						variant="outlined"
						value={log_user.bnum}
						InputProps={{
							readOnly: true,
						}}
					// onChange={onChangebnum}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Age"
						variant="outlined"
						value={log_user.bage}
						InputProps={{
							readOnly: true,
						}}
					// onChange={onChangebage}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <TextField
		label="Batch"
		variant="outlined"
		value={bbatch}
		onChange={onChangebbatch}
	/> */}
					<Box sx={{ width: 225 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Batch</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={log_user.bbatch}
								label="Batch"
								InputProps={{
									readOnly: true,
								}}
							// onChange={onChangebbatch}
							>
								<MenuItem value='UG1'>UG1</MenuItem>
								<MenuItem value='UG2'>UG2</MenuItem>
								<MenuItem value='UG3'>UG3</MenuItem>
								<MenuItem value='UG4'>UG4</MenuItem>
								<MenuItem value='UG5'>UG5</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						value={log_user.bpass}
						// onChange={onChangebpass}
						autoComplete="current-password"
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-password-input-2"
						label="Confirm password"
						type="password"
						value={log_user.bpass}
						// onChange={onChangebcpass}
						autoComplete="current-password"
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={() => navigate("/user_dashboard/edit_user_profile")}>
						Edit details
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Orders;
