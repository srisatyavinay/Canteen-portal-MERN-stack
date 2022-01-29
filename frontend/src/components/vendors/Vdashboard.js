import { useState, useEffect } from "react";
import axios from "axios";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function tagslist(x) {
	let a = ""
	for (const property in x) {
		if (x[property] === true) {
			a += property + ", "
		}
	}
	return a
}

const Vdashboard = (props) => {

	const navigate = useNavigate();

	// console.log(log_ven.vshop)

	const [items, setItems] = useState([])

	useEffect(() => {
		const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));
		const shopdetails = {
			shop: log_ven.vshop
		}
		axios
			.post("http://localhost:4000/item/shop_items", shopdetails)
			.then((response) => {
				// Swal.fire("Created " + response.data.vname);
				setItems(response.data.itemlist)
				// console.log(items);
			});
	}, [])

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12} md={12} lg={12}>
					<Button sx={{width: 400}} variant="contained" color="success" onClick={() => {
						navigate("/vendor_dashboard/new_item");
					}}>
						Add item
					</Button>
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					<Paper>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell> Sr No.</TableCell>
									<TableCell>
										{" "}
										{/* <Button onClick={sortChange}>
											{sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
										</Button> */}
										Name
									</TableCell>
									<TableCell>Veg/Non-veg</TableCell>
									<TableCell>Rating</TableCell>
									<TableCell>Shop name</TableCell>
									<TableCell>Tags</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item, ind) => (
									<TableRow key={ind + 1}>
										<TableCell>{ind + 1}</TableCell>
										<TableCell>{item.iname}</TableCell>
										<TableCell>{item.iveg}</TableCell>
										<TableCell>{item.irating}</TableCell>
										<TableCell>{item.ishop}</TableCell>
										<TableCell>{tagslist(item.itags)}</TableCell>
										<TableCell>{item.iprice}</TableCell>
										<TableCell>
											<Button onClick={() => {
												localStorage.setItem('edit_item', JSON.stringify(item))
												navigate("/vendor_dashboard/edit_item")
											}}>
												Edit
											</Button>
										</TableCell>
										<TableCell>
											<Button color="error" onClick={() => {
												axios
													.post(`http://localhost:4000/item/${item._id}`)
													.then((response) => {
														// Swal.fire("Created " + response.data.vname);
														Swal.fire({
															icon: 'success',
															title: 'Deleted successfully',
															text: 'Deleted ' + response.data.iname
														});
														// console.log(items);
														navigate("/vendor_dashboard");
													});
											}}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default Vdashboard;
