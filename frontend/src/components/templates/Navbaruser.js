import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbaruser = (props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/user_dashboard")}
          >
            Buyer Homepage
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/user_dashboard/my_orders")}>
            My orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/user_dashboard/user_profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => {
            localStorage.setItem('curr_user', {})
            navigate('/')
          }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbaruser;
