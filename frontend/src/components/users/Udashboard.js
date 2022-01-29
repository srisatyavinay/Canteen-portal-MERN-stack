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
// import { useNavigate } from 'react-router-dom';

function tagslist(x) {
    let a = ""
    for (const property in x) {
        if (x[property] === true) {
            a += property + ", "
        }
    }
    return a
}

const Udashboard = (props) => {

    // const [quantity, setquantity] = useState(0);

    const log_user = JSON.parse(localStorage.getItem('curr_user'));

    // console.log(log_user)

    // const navigate = useNavigate();

    // console.log(log_ven.vshop)

    const [items, setItems] = useState([])

    useEffect(() => {
        // const log_ven = JSON.parse(localStorage.getItem('curr_user'));
        axios
            .get("http://localhost:4000/item/")
            .then((response) => {
                // Swal.fire("Created " + response.data.vname);
                setItems(response.data.itemlist)
                // console.log(response.data.itemlist);
            });
    }, [])

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
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Favorite</TableCell>
                                    <TableCell>Place order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind + 1}</TableCell>
                                        <TableCell>{item.iname}</TableCell>
                                        <TableCell>{item.iveg}</TableCell>
                                        <TableCell>{item.irating}</TableCell>
                                        <TableCell>{item.ishop}</TableCell>
                                        <TableCell>{tagslist(item.itags)}</TableCell>
                                        <TableCell>{item.iprice}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => {
                                                const favoritepost = {
                                                    userid: log_user._id,
                                                    iname: item.iname,
                                                    iprice: item.iprice,
                                                    irating: item.irating,
                                                    iveg: item.iveg,
                                                    itags: item.itags,
                                                    ishop: item.ishop,
                                                }
                                                axios
                                                    .post(`http://localhost:4000/favorite/register`, favoritepost)
                                                    .then((response) => {
                                                        // Swal.fire("Created " + response.data.vname);
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Added Item to favorites'
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                window.location.reload(false);
                                                            }
                                                        })
                                                    });
                                            }}>
                                                Favorite
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button color="success" onClick={async () => {
                                                const { value: qty } = await Swal.fire({
                                                    input: 'text',
                                                    inputLabel: 'Enter Quantity',
                                                    inputPlaceholder: 'Type the quantity here ...',
                                                    inputAttributes: {
                                                        'aria-label': 'Type the quantity here'
                                                    },
                                                    showCancelButton: true,
                                                    inputValidator: (value) => {
                                                        if (!Number(value) || Number(value) <= 0) {
                                                            return 'Enter a valid number'
                                                        }
                                                    }
                                                })

                                                if (qty) {
                                                    const newOrder = {
                                                        userid: log_user._id,
                                                        uname: log_user.bname,
                                                        ptime: Date.now(),
                                                        itemid: item._id,
                                                        ishop: item.ishop,
                                                        iname: item.iname,
                                                        iprice: Number(item.iprice),
                                                        irating: Number(item.irating),
                                                        iveg: item.iveg,
                                                        quantity: qty,
                                                        status: "PLACED"
                                                    }
                                                    axios
                                                        .post(`http://localhost:4000/vendor/vtotalorders/incr`, { ishop: item.ishop })
                                                        .then((response) => {
                                                            if (response.data.vtotalorders) {
                                                                let g = response.data.vtotalorders
                                                            }
                                                        });
                                                    axios
                                                        .post(`http://localhost:4000/item/numtimes/incr`, { itemid: item._id })
                                                        .then((response) => {
                                                            if (response.data.numtimes) {
                                                                let h = response.data.numtimes
                                                            }
                                                        });
                                                    axios
                                                        .post(`http://localhost:4000/order/register`, newOrder)
                                                        .then((response) => {
                                                            // Swal.fire("Created " + response.data.vname);
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Placed order',
                                                                text: 'You can check status of your order in My orders page'
                                                            })
                                                        });
                                                }
                                            }}>
                                                Order
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

export default Udashboard;
