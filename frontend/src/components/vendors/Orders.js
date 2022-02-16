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
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
init("user_yq8MYnRfd9tMW6pKykYTv");

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

function replace(item) {
    if (item.status === "REJECTED") {
        return "REJECTED"
    }
    else if (item.status === "COMPLETED") {
        return "COMPLETED"
    }
    else {
        return (<Button color="success" variant="contained" onClick={() => {
            let post = {}
            if (item.status === "PLACED") {
                post = { status: "ACCEPTED" };
                // var a = 0
                axios
                    .post(`/api/vendor/vinacc/get`, { ishop: item.ishop })
                    .then((response) => {
                        if (response.data.vinacc) {
                            var a = response.data.vinacc
                            console.log(response.data)
                            if (a < 10) {
                                axios
                                    .post(`/api/user/getemail/${item.userid}`)
                                    .then((response) => {
                                        if (response.data.email) {
                                            var k = response.data.email
                                            // console.log({ email: k })
                                            axios
                                                .post(`/api/vendor/getvname`, { ishop: item.ishop })
                                                .then((response) => {
                                                    if (response.data.vname) {
                                                        var vendorname = response.data.vname
                                                        // console.log({ vendorname: vendorname, email: k })
                                                        const inputParams = {
                                                            from_name: item.ishop,
                                                            to_name: item.uname,
                                                            message: `${vendorname} accepted your order`,
                                                            to_email: k
                                                        }
                                                        emailjs.send('service_axxa5pd', 'template_kpigjw4', inputParams, 'user_yq8MYnRfd9tMW6pKykYTv')
                                                            .then((result) => {
                                                                console.log(result.text);
                                                            }, (error) => {
                                                                console.log(error.text);
                                                            });
                                                    }
                                                })
                                        }
                                    });
                                axios
                                    .post(`/api/vendor/vinacc/incr`, { ishop: item.ishop })
                                    .then((response) => {
                                        if (response.data.vinacc) {
                                            let b = response.data.vinacc
                                        }
                                    });
                                axios
                                    .post(`/api/vendor/vactiveorders/incr`, { ishop: item.ishop })
                                    .then((response) => {
                                        if (response.data.vactiveorders) {
                                            let c = response.data.vactiveorders
                                        }
                                    });
                                axios
                                    .post(`/api/order/${item._id}`, post)
                                    .then((response) => {
                                        // Swal.fire("Created " + response.data.vname);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Moved to next stage'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.reload(false);
                                            }
                                        })
                                    });
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Cannot place order',
                                    text: 'No.of orders in accepted/cooking stage are 10'
                                })
                            }
                        }
                    });

            }
            else if (item.status === "ACCEPTED") {
                post = { status: "COOKING" };
                axios
                    .post(`/api/order/${item._id}`, post)
                    .then((response) => {
                        // Swal.fire("Created " + response.data.vname);
                        Swal.fire({
                            icon: 'success',
                            title: 'Moved to next stage'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(false);
                            }
                        })
                    });
            }
            else if (item.status === "COOKING") {
                post = { status: "READY FOR PICKUP" };
                axios
                    .post(`/api/vendor/vinacc/decr`, { ishop: item.ishop })
                    .then((response) => {
                        if (response.data.vinacc) {
                            let d = response.data.vinacc
                        }
                    });
                axios
                    .post(`/api/order/${item._id}`, post)
                    .then((response) => {
                        // Swal.fire("Created " + response.data.vname);
                        Swal.fire({
                            icon: 'success',
                            title: 'Moved to next stage'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(false);
                            }
                        })
                    });
            }
            else if (item.status === "READY FOR PICKUP") {
                post = { status: "COMPLETED" };
                axios
                    .post(`/api/vendor/vactiveorders/decr`, { ishop: item.ishop })
                    .then((response) => {
                        if (response.data.vactiveorders) {
                            let e = response.data.vactiveorders
                        }
                    });
                axios
                    .post(`/api/vendor/vcompleted/incr`, { ishop: item.ishop })
                    .then((response) => {
                        if (response.data.vcompleted) {
                            let f = response.data.vcompleted
                        }
                    });
                axios
                    .post(`/api/item/comnumtimes/incr`, { itemid: item.itemid })
                    .then((response) => {
                        if (response.data.comnumtimes) {
                            let n = response.data.comnumtimes
                        }
                    });
                axios
                    .post(`/api/order/${item._id}`, post)
                    .then((response) => {
                        // Swal.fire("Created " + response.data.vname);
                        Swal.fire({
                            icon: 'success',
                            title: 'Moved to next stage'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(false);
                            }
                        })
                    });
            }
        }}>
            MOVE TO NEXT STAGE
        </Button>)
    }
}

function replace2(item) {
    if (item.status === "PLACED") {
        return (<Button color="error" variant="contained" onClick={() => {
            let post = { status: "REJECTED" }
            // const [money, setmoney] = useState(0);
            let money = 0;
            // const log_user = JSON.parse(localStorage.getItem('curr_user'));
            axios
                .post(`/api/user/getemail/${item.userid}`)
                .then((response) => {
                    if (response.data.email) {
                        var k = response.data.email
                        // console.log({ email: k })
                        axios
                            .post(`/api/vendor/getvname`, { ishop: item.ishop })
                            .then((response) => {
                                if (response.data.vname) {
                                    var vendorname = response.data.vname
                                    // console.log({ vendorname: vendorname })
                                    const inputParams = {
                                        from_name: item.ishop,
                                        to_name: item.uname,
                                        message: `${vendorname} rejected your order`,
                                        to_email: k
                                    }
                                    emailjs.send('service_axxa5pd', 'template_kpigjw4', inputParams, 'user_yq8MYnRfd9tMW6pKykYTv')
                                        .then((result) => {
                                            console.log(result.text);
                                        }, (error) => {
                                            console.log(error.text);
                                        });
                                }
                            })
                    }
                });
            axios
                .post(`/api/user/money/${item.userid}`)
                .then((response) => {
                    // Swal.fire("Created " + response.data.vname);
                    money = response.data.money
                    // console.log(response.data.itemlist);
                    const y = money + item.iprice * item.quantity
                    axios
                        .post(`/api/user/money/update/${item.userid}`, { money: y })
                        .then((response) => {
                            if (response.data.money) {
                                let i = response.data.money
                            }
                        })
                });

            axios
                .post(`/api/vendor/vrejected/incr`, { ishop: item.ishop })
                .then((response) => {
                    if (response.data.vrejected) {
                        let l = response.data.vrejected
                    }
                });

            axios
                .post(`/api/order/${item._id}`, post)
                .then((response) => {
                    // Swal.fire("Created " + response.data.vname);
                    Swal.fire({
                        icon: 'success',
                        title: 'Rejected Item'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })
                });
        }}>
            REJECT
        </Button>)
    }
    else {
        return ""
    }
}

const Orders = (props) => {

    // const [quantity, setquantity] = useState(0);

    // const log_user = JSON.parse(localStorage.getItem('curr_user'));

    // console.log(log_user)

    // const navigate = useNavigate();

    // console.log(log_ven.vshop)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const log_ven = JSON.parse(localStorage.getItem('curr_vendor'));
        // const log_user = JSON.parse(localStorage.getItem('curr_user'));
        axios
            .post("/api/order/vendor_orders/", { ishop: log_ven.vshop })
            .then((response) => {
                // Swal.fire("Created " + response.data.vname);
                setOrders(response.data.orderlist)
                // console.log(response.data.itemlist);
            });
    }, [])

    orders.reverse();

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
                                        Item Name
                                    </TableCell>
                                    <TableCell> Ordered by </TableCell>
                                    <TableCell> Placed time </TableCell>
                                    <TableCell>Veg/Non-veg</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Shop name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Net Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    {/* <TableCell>Place order</TableCell> */}
                                    <TableCell>Stage</TableCell>
                                    <TableCell>Reject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((item, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind + 1}</TableCell>
                                        <TableCell>{item.iname}</TableCell>
                                        <TableCell>{item.uname}</TableCell>
                                        <TableCell>{item.ptime}</TableCell>
                                        <TableCell>{item.iveg}</TableCell>
                                        <TableCell>{item.irating}</TableCell>
                                        <TableCell>{item.ishop}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.quantity * item.iprice}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            {replace(item)}
                                        </TableCell>
                                        <TableCell>
                                            {replace2(item)}
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

export default Orders;
