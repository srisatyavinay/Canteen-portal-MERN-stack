import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbarvendor = (props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/vendor_dashboard")}
          >
            Vendor Homepage
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/vendor_dashboard/new_item")}>
            New item
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendor_dashboard/orders")}>
            Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendor_dashboard/statistics")}>
            Statistics
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendor_dashboard/vendor_profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => {
            localStorage.setItem('curr_vendor', {})
            navigate('/')
          }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbarvendor;
