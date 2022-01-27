import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Vprofile = (props) => {
	const navigate = useNavigate();
	const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						value={log_ven.vname}
						// onChange={onChangevname}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						value={log_ven.vemail}
						// onChange={onChangevemail}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Contact no."
						variant="outlined"
						value={log_ven.vnum}
						// onChange={onChangevnum}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Shop name"
						variant="outlined"
						value={log_ven.vshop}
						// onChange={onChangevshop}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="time"
						label="Shop opening time"
						type="time"
						// defaultValue="07:30"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300, // 5 min
						}}
						sx={{ width: 215 }}
						value={log_ven.vopen}
						// onChange={onChangevopen}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="time"
						label="Shop closing time"
						type="time"
						// defaultValue="07:30"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300, // 5 min
						}}
						sx={{ width: 215 }}
						value={log_ven.vclose}
						// onChange={onChangevclose}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						value={log_ven.vpass}
						// onChange={onChangevpass}
						autoComplete="current-password"
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={() => navigate("/vendor_dashboard/edit_vendor_profile")}>
						Edit profile details
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Vprofile;