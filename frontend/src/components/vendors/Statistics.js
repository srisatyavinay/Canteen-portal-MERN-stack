import { useState, useEffect } from "react";
import axios from "axios";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import Swal from 'sweetalert2';
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

const Statistics = (props) => {

	const navigate = useNavigate();

	// console.log(log_ven.vshop)

	const [items, setItems] = useState([])

	const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));

	useEffect(() => {
		const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));
		const shopdetails = {
			shop: log_ven.vshop
		}
		axios
			.post("/api/item/shop_items", shopdetails)
			.then((response) => {
				// Swal.fire("Created " + response.data.vname);
				setItems(response.data.itemlist)
				// console.log(items);
			});
	}, [])

	// const nitems = items

	items.sort(function (a, b) { return b.comnumtimes - a.comnumtimes })

	const nitems = items.slice(0, 5)

	// console.log(nitems)

	// setItems([nitems[0], nitems[1], nitems[2], nitems[3], nitems[4]])

	// console.log(items)

	return (
		<>
			<Grid container align={"center"} spacing={2}>
				<Grid item xs={12} md={9} lg={9}>
					Top 5 sold items:
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
									<TableCell>No.of times</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{nitems.map((item, ind) => (
									<TableRow key={ind + 1}>
										<TableCell>{ind + 1}</TableCell>
										<TableCell>{item.iname}</TableCell>
										<TableCell>{item.iveg}</TableCell>
										<TableCell>{item.irating}</TableCell>
										<TableCell>{item.ishop}</TableCell>
										<TableCell>{tagslist(item.itags)}</TableCell>
										<TableCell>{item.iprice}</TableCell>
										<TableCell>{item.comnumtimes}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					<br /><br /><h3>Counts:</h3>
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					Orders Placed: {log_ven.vtotalorders}
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					Pending Orders: {log_ven.vtotalorders - (log_ven.vcompleted + log_ven.vrejected)}
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					Completed Orders: {log_ven.vcompleted}
				</Grid>
				<Grid item xs={12} md={9} lg={9}>
					Rejected Orders: {log_ven.vrejected}
				</Grid>
			</Grid>
		</>
	)
}

export default Statistics;
