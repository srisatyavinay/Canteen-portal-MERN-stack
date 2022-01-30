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
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// function tagslist(x) {
//     let a = ""
//     for (const property in x) {
//         if (x[property] === true) {
//             a += property + ", "
//         }
//     }
//     return a
// }

function replace(item, value, setValue) {
    if (item.status === "COMPLETED" && item.rated === false) {
        return (
            <>
                <Rating
                    name="simple-controlled"
                    value={value}
                    // defaultValue={2}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <>&nbsp; &nbsp;</>
                <Button variant="contained" color="success" onClick={() => {
                    console.log({value: value})
                    axios
                        .post(`http://localhost:4000/order/rate/${item._id}`)
                        .then((response) => {
                            // Swal.fire("Created " + response.data.vname);
                            let m = response.data
                        });
                    axios
                        .post(`http://localhost:4000/item/getratingandcomorders/${item.itemid}`)
                        .then((response) => {
                            const prevrating = response.data.irating
                            const prevcomnumtimes = response.data.comnumtimes
                            const newrating = ((value + (prevrating * (prevcomnumtimes - 1))) / (prevcomnumtimes))
                            console.log({newrating: newrating})
                            axios
                                .post(`http://localhost:4000/item/updaterating/${item.itemid}`, { newrating: Math.round(newrating) })
                                .then((response) => {
                                    let o = response.data
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Rating submitted'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload(false);
                                        }
                                    })
                                })
                        })
                }}>
                    Submit
                </Button>
            </>
        )
    }
    else {
        return ""
    }
}

const Uorders = (props) => {

    const [value, setValue] = useState(0);

    // const [quantity, setquantity] = useState(0);

    // const log_user = JSON.parse(localStorage.getItem('curr_user'));

    // console.log(log_user)

    // const navigate = useNavigate();

    // console.log(log_ven.vshop)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        // const log_ven = JSON.parse(localStorage.getItem('curr_user'));
        const log_user = JSON.parse(localStorage.getItem('curr_user'));
        axios
            .post("http://localhost:4000/order/user_orders/", { userid: log_user._id })
            .then((response) => {
                // Swal.fire("Created " + response.data.vname);
                setOrders(response.data.orderlist)
                // console.log(response.data.itemlist);
            });
    }, [])

    orders.reverse()

    return (
        <>
            <Grid container align={"center"} spacing={2}>
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
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Net Price</TableCell>
                                    <TableCell>Placed time</TableCell>
                                    <TableCell>Status</TableCell>
                                    {/* <TableCell>Place order</TableCell> */}
                                    <TableCell>Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((item, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind + 1}</TableCell>
                                        <TableCell>{item.iname}</TableCell>
                                        <TableCell>{item.iveg}</TableCell>
                                        <TableCell>{item.irating}</TableCell>
                                        <TableCell>{item.ishop}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.quantity * item.iprice}</TableCell>
                                        <TableCell>{item.ptime}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{replace(item, value, setValue)}</TableCell>
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

export default Uorders;
