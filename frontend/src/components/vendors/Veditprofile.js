import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

const Veditprofile = (props) => {
	// const navigate = useNavigate();
	const [vname, setvname] = useState("");
	const [vemail, setvemail] = useState("");
	// const [bdate, setDate] = useState(null);
	const [vnum, setvnum] = useState("");
	const [vshop, setvshop] = useState("");
	const [vopen, setvopen] = useState("");
	const [vclose, setvclose] = useState("");
	const [vpass, setvpass] = useState("");
	const [vcpass, setvcpass] = useState("");

	const onChangevname = (event) => {
		setvname(event.target.value);
	};

	const onChangevemail = (event) => {
		setvemail(event.target.value);
	};

	const onChangevnum = (event) => {
		setvnum(event.target.value);
	};

	const onChangevshop = (event) => {
		setvshop(event.target.value);
	};

	const onChangevopen = (event) => {
		setvopen(event.target.value);
	};

	const onChangevclose = (event) => {
		setvclose(event.target.value);
	};

	const onChangevpass = (event) => {
		setvpass(event.target.value);
	};

	const onChangevcpass = (event) => {
		setvcpass(event.target.value);
	};

	useEffect(() => {
		const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));
		const resetInputs2 = () => {
			setvname(log_ven.vname);
			setvemail(log_ven.vemail);
			setvnum(log_ven.vnum);
			setvshop(log_ven.vshop);
			setvopen(log_ven.vopen);
			setvclose(log_ven.vclose);
			setvpass(log_ven.vpass);
			setvcpass(log_ven.vpass);
		};
		resetInputs2();
	}, [])

	const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));

	// const resetInputs2 = () => {
	// 	setvname(log_ven.vname);
	// 	setvemail(log_ven.vemail);
	// 	setvnum(log_ven.vnum);
	// 	setvshop(log_ven.vshop);
	// 	setvopen(log_ven.vopen);
	// 	setvclose(log_ven.vclose);
	// 	setvpass(log_ven.vpass);
	// 	setvcpass(log_ven.vpass);
	// };

	// const resetInputs2 = () => {
	// 	setvname('');
	// 	setvemail('');
	// 	setvnum('');
	// 	setvshop('');
	// 	setvopen('');
	// 	setvclose('');
	// 	setvpass('');
	// 	setvcpass('');
	// };

	const onSubmit2 = (event) => {
		event.preventDefault();

		const newVendor = {
			vname: vname,
			vemail: vemail,
			vnum: vnum,
			vshop: vshop,
			vopen: vopen,
			vclose: vclose,
			vpass: vpass
		};

		// console.log(newVendor)
		// console.log(newVendor)
		// console.log(newVendor)

		if (vname && vemail && vnum && vshop && vopen && vclose && vpass && (vpass === vcpass) && Number.isInteger(Number(vnum)) && Number(vnum) >= 0) {
			axios
				.post(`http://localhost:4000/vendor/${log_ven._id}`, newVendor)
				.then((response) => {
					// Swal.fire("Created " + response.data.vname);
					Swal.fire({
						icon: 'success',
						title: 'Edited successfully',
						text: "Detais changed",
					});
					// console.log(response.data.vendordetails);
					localStorage.setItem('curr_vendor', JSON.stringify(response.data))
					// console.log(localStorage.getItem('curr_vendor'))
				});
		}
		else {
			Swal.fire({
				icon: 'error',
				title: 'Invalid input',
				text: 'Enter valid details',
			});
		}

		// navigate(0)
		// resetInputs2();
		// window.location.reload(false);
	};

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						value={vname}
						onChange={onChangevname}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						value={vemail}
						onChange={onChangevemail}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Contact no."
						variant="outlined"
						value={vnum}
						onChange={onChangevnum}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Shop name"
						variant="outlined"
						value={vshop}
						onChange={onChangevshop}
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
						value={vopen}
						onChange={onChangevopen}
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
						value={vclose}
						onChange={onChangevclose}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						value={vpass}
						onChange={onChangevpass}
						autoComplete="current-password"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-password-input-2"
						label="Confirm Password"
						type="password"
						value={vcpass}
						onChange={onChangevcpass}
						autoComplete="current-password"
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={onSubmit2}>
						Register
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Veditprofile;
