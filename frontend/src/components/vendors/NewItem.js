import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
// import Autocomplete from '@mui/material/Autocomplete';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { Typography } from "@mui/material";

const NewItem = (props) => {
	const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));
	const [iname, setiname] = useState("");
	const [iprice, setiprice] = useState("");
	// const [bdate, setDate] = useState(null);
	const [irating, setirating] = useState(0);
	const [iveg, setiveg] = useState("");
	const [itags, setitags] = useState({
		natural: false,
		organic: false,
		fresh: false,
		oilfree: false,
	});
	// const [iaddons, setiaddons] = useState("");

	const onChangeiname = (event) => {
		setiname(event.target.value);
	};

	const onChangeiprice = (event) => {
		setiprice(event.target.value);
	};

	// const onChangeirating = (event) => {
	// 	setirating(event.target.value);
	// };

	const onChangeiveg = (event) => {
		setiveg(event.target.value);
	};

	const onChangeitags = (event) => {
		setitags({
			...itags,
			[event.target.name]: event.target.checked,
		});
	};

	// const onChangeiaddons = (event) => {
	// 	setiaddons(event.target.value);
	// };

	const resetInputs2 = () => {
		setiname("");
		setiprice("");
		// setirating("");
		// setiveg("");
		// setitags("");
		// setiaddons("");
	};

	const onSubmit2 = (event) => {
		event.preventDefault();

		const newItem = {
			iname: iname,
			iprice: Number(iprice),
			irating: Number(irating),
			iveg: iveg,
			itags: itags,
			// iaddons: iaddons
			ishop: log_ven.vshop,
			numtimes: 0,
			comnumtimes: 0
		};

		if (iname && iprice && iveg && Number.isInteger(Number(iprice)) && Number(iprice) > 0) {
			axios
				.post(`/api/item/register`, newItem)
				.then((response) => {
					// Swal.fire("Created " + response.data.vname);
					Swal.fire({
						icon: 'success',
						title: 'Registered successfully',
						text: "Created " + response.data.iname,
					});
					console.log(response.data);
				});
		}
		else {
			Swal.fire({
				icon: 'error',
				title: 'Invalid input',
				text: 'Enter correct details',
			});
		}

		resetInputs2();
	};

	const { natural, organic, fresh, oilfree } = itags;

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Item Name"
						variant="outlined"
						value={iname}
						onChange={onChangeiname}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Price"
						variant="outlined"
						value={iprice}
						onChange={onChangeiprice}
					/>
				</Grid>
				<Grid item xs={12}>
				<Typography component="legend">Initial rating (0)</Typography>
					<Rating name="read-only" value={irating} readOnly />
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Veg/Non-veg</FormLabel>
						<RadioGroup
							aria-label="veg-non-veg"
							defaultValue="veg"
							value={iveg}
							onChange={onChangeiveg}
							name="radio-buttons-group"
						>
							<FormControlLabel value="veg" control={<Radio />} label="Veg" />
							<FormControlLabel value="non-veg" control={<Radio />} label="Non-veg" />
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
						<FormLabel component="legend">Tags</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox checked={natural} onChange={onChangeitags} name="natural" />
								}
								label="Natural"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={organic} onChange={onChangeitags} name="organic" />
								}
								label="Organic"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={fresh} onChange={onChangeitags} name="fresh" />
								}
								label="Fresh"
							/>
							<FormControlLabel
								control={
									<Checkbox checked={oilfree} onChange={onChangeitags} name="oilfree" />
								}
								label="Oil free"
							/>
						</FormGroup>
					</FormControl>
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

export default NewItem;
