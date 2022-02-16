import { useState } from "react";
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
import validator from 'validator'

const Register = (props) => {
  const [bname, setbname] = useState("");
  const [bemail, setbemail] = useState("");
  // const [bdate, setDate] = useState(null);
  const [bnum, setbnum] = useState("");
  const [bage, setbage] = useState("");
  const [bbatch, setbbatch] = useState("");
  const [bpass, setbpass] = useState("");
  const [bcpass, setbcpass] = useState("");
  const [vbreg, setvbreg] = useState("");

  const [vname, setvname] = useState("");
  const [vemail, setvemail] = useState("");
  // const [bdate, setDate] = useState(null);
  const [vnum, setvnum] = useState("");
  const [vshop, setvshop] = useState("");
  const [vopen, setvopen] = useState("");
  const [vclose, setvclose] = useState("");
  const [vpass, setvpass] = useState("");
  const [vcpass, setvcpass] = useState("");

  const onChangevbreg = (event) => {
    setvbreg(event.target.value);
  };

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

  const resetInputs = () => {
    setbname("");
    setbemail("");
    setbnum("");
    setbage("");
    setbbatch("");
    setbpass("");
    setbcpass("");
  };

  const resetInputs2 = () => {
    setvname("");
    setvemail("");
    setvnum("");
    setvshop("");
    setvopen("");
    setvclose("");
    setvpass("");
    setvcpass("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newBuyer = {
      bname: bname,
      bemail: bemail,
      bnum: bnum,
      bage: Number(bage),
      bbatch: bbatch,
      bpass: bpass,
      bwallet: 40
    };

    if (bname && bemail && bnum && bage && bbatch && bpass && (bpass === bcpass) && validator.isEmail(bemail) && bnum.length === 10 && Number.isInteger(Number(bnum)) && Number.isInteger(Number(bage)) && Number(bage) >= 0 && Number(bnum) >= 0) {
      axios
        .post("/api/user/register", newBuyer)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registered successfully',
            text: "Created " + response.data.bname,
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

    resetInputs();
  };

  const onSubmit2 = (event) => {
    event.preventDefault();

    const newVendor = {
      vname: vname,
      vemail: vemail,
      vnum: vnum,
      vshop: vshop,
      vopen: vopen,
      vclose: vclose,
      vpass: vpass,
      vtotalorders: 0,
      vactiveorders: 0,
      vcompleted: 0,
      vinacc: 0,
      vrejected: 0
    };

    if (vname && vemail && vnum && vshop && vopen && vclose && vpass && (vpass === vcpass) && ((Number(vopen.slice(0, 2)) < Number(vclose.slice(0, 2))) || ((Number(vopen.slice(0, 2)) === Number(vclose.slice(0, 2))) && (Number(vopen.slice(3, 5)) < Number(vclose.slice(3, 5))))) && validator.isEmail(vemail) && vnum.length === 10 && Number.isInteger(Number(vnum)) && Number(vnum) >= 0) {
      axios
        .post("/api/vendor/vendorpost", newVendor)
        .then((response) => {
          // Swal.fire("Created " + response.data.vname);
          Swal.fire({
            icon: 'success',
            title: 'Registered successfully',
            text: "Created " + response.data.vname,
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

  return (
    <>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: 225 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Buyer/Vendor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vbreg}
                label="Buyer/Vendor"
                onChange={onChangevbreg}
              >
                <MenuItem value='Buyer'>Buyer</MenuItem>
                <MenuItem value='Vendor'>Vendor</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <br />
      <hr />
      <br />

      {/* <Typography></Typography>     */}

      {(vbreg === 'Buyer') ?
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
        : ""}

      {(vbreg === 'Vendor') ?
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
          {/* <Grid item xs={12}>
            <TextField
              label="Opening time"
              variant="outlined"
              value={vopen}
              onChange={onChangevopen}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing time"
              variant="outlined"
              value={vclose}
              onChange={onChangevclose}
            />
          </Grid> */}
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
              label="Confirm password"
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
        : ""}
    </>
  );
};

export default Register;
