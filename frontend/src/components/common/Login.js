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
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = (props) => {
  const navigate = useNavigate();

  const [lbemail, setlbemail] = useState("");
  const [lbpass, setlbpass] = useState("");
  const [lvemail, setlvemail] = useState("");
  const [lvpass, setlvpass] = useState("");

  const [vblog, setvblog] = useState("");

  const onChangevblog = (event) => {
    setvblog(event.target.value);
  };

  const onChangelbemail = (event) => {
    setlbemail(event.target.value);
  };

  const onChangelbpass = (event) => {
    setlbpass(event.target.value);
  };

  const onChangelvemail = (event) => {
    setlvemail(event.target.value);
  };

  const onChangelvpass = (event) => {
    setlvpass(event.target.value);
  };

  const onlSubmit = (event) => {
    event.preventDefault();

    const buyer = {   
      email: lbemail,
      password: lbpass
    };

    if (lbemail && lbpass) {
      axios
        .post("http://localhost:4000/user/login", buyer)
        .then((response) => {
          Swal.fire(response.data.message)
          // props.setLoginUser(response.data.user);
          if(response.data.user)
          {
            // props.setLoginType(1);
            localStorage.setItem('curr_user', response.data.user)
            // navigate("/");
            navigate("/user_dashboard", { replace: true });
          }
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: 'Enter correct details',
      });
    }
  }

  const onlSubmit2 = (event) => {
    event.preventDefault();

    const vendor = {   
      email: lvemail,
      password: lvpass
    };

    if (lvemail && lvpass) {
      axios
        .post("http://localhost:4000/vendor/login", vendor)
        .then((response) => {
          Swal.fire(response.data.message);
          // props.setLoginVendor(response.data.vendor);
          console.log(response.data.vendor);
          if(response.data.vendor)
          {
            // props.setLoginType(2);
            // navigate("/");
            window.localStorage.setItem('curr_vendor', JSON.stringify(response.data.vendor));
            // console.log(JSON.parse(window.localStorage.getItem("curr_vendor")));
            navigate("/vendor_dashboard", { replace: true });
          }
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: 'Enter correct details',
      });
    }
  }

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
                value={vblog}
                label="Buyer/Vendor"
                onChange={onChangevblog}
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

      {(vblog === 'Buyer') ?
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={lbemail}
              onChange={onChangelbemail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={lbpass}
              onChange={onChangelbpass}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onlSubmit}>
              Login
            </Button>
          </Grid>
        </Grid>
        : ""}

      {(vblog === 'Vendor') ?
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={lvemail}
              onChange={onChangelvemail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={lvpass}
              onChange={onChangelvpass}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onlSubmit2}>
              Login
            </Button>
          </Grid>
        </Grid>
        : ""}
    </>
  )
}

export default Login;
