import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

const Ueditprofile = (props) => {
    const log_user = JSON.parse(localStorage.getItem('curr_user'));

    const [bname, setbname] = useState("");
    const [bemail, setbemail] = useState("");
    // const [bdate, setDate] = useState(null);
    const [bnum, setbnum] = useState("");
    const [bage, setbage] = useState("");
    const [bbatch, setbbatch] = useState("");
    const [bpass, setbpass] = useState("");
    const [bcpass, setbcpass] = useState("");

    const onChangebname = (event) => {
        setbname(event.target.value);
    };

    const onChangebemail = (event) => {
        setbemail(event.target.value);
    };

    const onChangebnum = (event) => {
        setbnum(event.target.value);
    };

    const onChangebage = (event) => {
        setbage(event.target.value);
    };

    const onChangebbatch = (event) => {
        setbbatch(event.target.value);
    };

    const onChangebpass = (event) => {
        setbpass(event.target.value);
    };

    const onChangebcpass = (event) => {
        setbcpass(event.target.value);
    };

    const resetInputs = () => {
        setbname("");
        setbemail("");
        setbnum("");
        setbage("");
        setbbatch("");
        setbpass("");
        setbcpass("");
    };

    useEffect(() => {
		const log_user = JSON.parse(localStorage.getItem('curr_user'));
		const resetInputs = () => {
			setbname(log_user.bname);
			setbemail(log_user.bemail);
			setbnum(log_user.bnum);
			setbage(log_user.bage);
			setbbatch(log_user.bbatch);
			setbpass(log_user.bpass);
			setbcpass(log_user.bpass);
		};
		resetInputs();
	}, [])

    const onSubmit = (event) => {
        event.preventDefault();

        const newBuyer = {
            bname: bname,
            bemail: bemail,
            bnum: bnum,
            bage: bage,
            bbatch: bbatch,
            bpass: bpass
        };

        if (bname && bemail && bnum && bage && bbatch && bpass && (bpass === bcpass) && Number.isInteger(Number(bnum)) && Number.isInteger(Number(bage)) && Number(bage) >= 0 && Number(bnum) >= 0) {
            axios
                .post(`http://localhost:4000/user/${log_user._id}`, newBuyer)
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Edited successfully',
						text: "Detais changed",
                    });
                    localStorage.setItem('curr_user', JSON.stringify(response.data))
                });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid input',
                text: 'Enter correct details',
            });
        }

        // resetInputs();
    };

    return (
        <>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={bname}
                        onChange={onChangebname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={bemail}
                        onChange={onChangebemail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contact no."
                        variant="outlined"
                        value={bnum}
                        onChange={onChangebnum}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={bage}
                        onChange={onChangebage}
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
                                value={bbatch}
                                label="Batch"
                                onChange={onChangebbatch}
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
                        value={bpass}
                        onChange={onChangebpass}
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-password-input-2"
                        label="Confirm password"
                        type="password"
                        value={bcpass}
                        onChange={onChangebcpass}
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Ueditprofile;
