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
import TextField from "@mui/material/TextField";
import Ufavorites from "./Ufavorites";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
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

// function replace(item, log_user, shopoc, setshopoc, money, setmoney) {
//     axios
//         .post("http://localhost:4000/vendor/getvopenvclose", { ishop: item.ishop })
//         .then((response) => {
//             setshopoc({ vopen: response.data.vopen, vclose: response.data.vclose })
//         });

//     const x = new Date();
//     const hrs = Number(x.getHours());
//     const mins = Number(x.getMinutes());

//     if ((hrs < Number(String(shopoc.vclose).slice(0, 2)) && hrs > Number(String(shopoc.vopen).slice(0, 2))) || (hrs === Number(String(shopoc.vopen).slice(0, 2)) && mins >= Number(String(shopoc.vopen).slice(3, 5))) || (hrs === Number(String(shopoc.vclose).slice(0, 2)) && mins < Number(String(shopoc.vclose).slice(3, 5)))) {
//         return (<Button variant="contained" color="success" onClick={async () => {
//             const { value: qty } = await Swal.fire({
//                 input: 'text',
//                 inputLabel: 'Enter Quantity',
//                 inputPlaceholder: 'Type the quantity here ...',
//                 inputAttributes: {
//                     'aria-label': 'Type the quantity here'
//                 },
//                 showCancelButton: true,
//                 inputValidator: (value) => {
//                     if (!Number(value) || Number(value) <= 0) {
//                         return 'Enter a valid number'
//                     }
//                 }
//             })

//             if (qty) {
//                 // var today = new Date();
//                 // const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//                 const time = new Date();
//                 const newOrder = {
//                     userid: log_user._id,
//                     uname: log_user.bname,
//                     ptime: time,
//                     itemid: item._id,
//                     ishop: item.ishop,
//                     iname: item.iname,
//                     iprice: Number(item.iprice),
//                     irating: Number(item.irating),
//                     iveg: item.iveg,
//                     quantity: qty,
//                     status: "PLACED",
//                     rated: false
//                 }
//                 if (newOrder.iprice * newOrder.quantity <= money) {
//                     axios
//                         .post(`http://localhost:4000/vendor/vtotalorders/incr`, { ishop: item.ishop })
//                         .then((response) => {
//                             if (response.data.vtotalorders) {
//                                 let g = response.data.vtotalorders
//                             }
//                         });
//                     axios
//                         .post(`http://localhost:4000/item/numtimes/incr`, { itemid: item._id })
//                         .then((response) => {
//                             if (response.data.numtimes) {
//                                 let h = response.data.numtimes
//                             }
//                         });
//                     const y = money - newOrder.iprice * newOrder.quantity;
//                     axios
//                         .post(`http://localhost:4000/user/money/update/${log_user._id}`, { money: y })
//                         .then((response) => {
//                             if (response.data.money) {
//                                 let i = response.data.money
//                             }
//                         })
//                     axios
//                         .post(`http://localhost:4000/order/register`, newOrder)
//                         .then((response) => {
//                             // Swal.fire("Created " + response.data.vname);
//                             Swal.fire({
//                                 icon: 'success',
//                                 title: 'Placed order',
//                                 text: 'You can check status of your order in My orders page'
//                             }).then((result) => {
//                                 if (result.isConfirmed) {
//                                     window.location.reload(false);
//                                 }
//                             })
//                         });
//                 }
//                 else {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Insufficient amount in wallet',
//                         text: 'Order not placed. Please add money to your wallet'
//                     })
//                 }
//             }
//         }}>
//             Order
//         </Button>)
//     }
//     else {
//         return (
//             <Button disabled variant="contained" color="success">Order</Button>
//         )
//     }

// }

const Udashboard = (props) => {

    // const [quantity, setquantity] = useState(0);

    const [money, setmoney] = useState(0);
    const [inputMoney, setInputMoney] = useState("");
    const [searchText, setSearchText] = useState("");

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const onChangeinputmoney = (event) => {
        setInputMoney(event.target.value);
    };

    const log_user = JSON.parse(localStorage.getItem('curr_user'));

    // console.log(log_user)

    // const navigate = useNavigate();

    // console.log(log_ven.vshop)

    const [items, setItems] = useState([])

    const [shopoc, setshopoc] = useState({})


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

    useEffect(() => {
        // const log_ven = JSON.parse(localStorage.getItem('curr_user'));
        const log_user = JSON.parse(localStorage.getItem('curr_user'));
        axios
            .post(`http://localhost:4000/user/money/${log_user._id}`)
            .then((response) => {
                // Swal.fire("Created " + response.data.vname);
                setmoney(response.data.money)
                // console.log(response.data.itemlist);
            });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        if (Number.isInteger(Number(inputMoney)) && Number(inputMoney) > 0) {
            const x = Number(inputMoney) + money;
            axios
                .post(`http://localhost:4000/user/money/update/${log_user._id}`, { money: x })
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Added money',
                        text: "Added " + inputMoney,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })
                    // console.log(response.data);
                })
        }

        // resetInputs();
    };

    // const resetInputs = () => {
    //     setInputMoney(0)
    // };

    return (
        <>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12} md={9} lg={9}>
                    <h3>Wallet Money:</h3>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <TextField
                        label="Wallet money"
                        variant="outlined"
                        value={money}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <TextField
                        label="Add Money"
                        variant="outlined"
                        value={inputMoney}
                        onChange={onChangeinputmoney}
                    />
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Button variant="contained" onClick={onSubmit}>
                        Add money
                    </Button>
                </Grid>
            </Grid>
            <br />
            <br />
            <hr />
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12} md={9} lg={9}>
                    <h3>Available Food Items:</h3>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <TextField id="outlined-search" placeholder="Search" sx={{ width: 500 }} label="Search field" value={searchText} onChange={onChangeSearchText} type="search" InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }} />
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
                                    <TableCell>Favorite</TableCell>
                                    <TableCell>Place order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.filter((val) => {
                                    if (searchText === "") {
                                        return val
                                    }
                                    else if (val.iname.toLowerCase().includes(searchText.toLowerCase())) {
                                        return val
                                    }
                                }).map((item, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind + 1}</TableCell>
                                        <TableCell>{item.iname}</TableCell>
                                        <TableCell>{item.iveg}</TableCell>
                                        <TableCell>{item.irating}</TableCell>
                                        <TableCell>{item.ishop}</TableCell>
                                        <TableCell>{tagslist(item.itags)}</TableCell>
                                        <TableCell>{item.iprice}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => {
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
                                            {/* {replace(item, log_user, shopoc, setshopoc, money, setmoney)} */}
                                            <Button variant="contained" color="success" onClick={async () => {
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
                                                    var today = new Date();
                                                    // const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                                                    // const time = Date.now();
                                                    const newOrder = {
                                                        userid: log_user._id,
                                                        uname: log_user.bname,
                                                        ptime: today,
                                                        itemid: item._id,
                                                        ishop: item.ishop,
                                                        iname: item.iname,
                                                        iprice: Number(item.iprice),
                                                        irating: Number(item.irating),
                                                        iveg: item.iveg,
                                                        quantity: qty,
                                                        status: "PLACED",
                                                        rated: false
                                                    }
                                                    if (newOrder.iprice * newOrder.quantity <= money) {
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
                                                        const y = money - newOrder.iprice * newOrder.quantity;
                                                        axios
                                                            .post(`http://localhost:4000/user/money/update/${log_user._id}`, { money: y })
                                                            .then((response) => {
                                                                if (response.data.money) {
                                                                    let i = response.data.money
                                                                }
                                                            })
                                                        axios
                                                            .post(`http://localhost:4000/order/register`, newOrder)
                                                            .then((response) => {
                                                                // Swal.fire("Created " + response.data.vname);
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Placed order',
                                                                    text: 'You can check status of your order in My orders page'
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
                                                            title: 'Insufficient amount in wallet',
                                                            text: 'Order not placed. Please add money to your wallet'
                                                        })
                                                    }
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
            <br />
            <br />
            <hr />
            <br />
            <Ufavorites />
        </>
    )
}

export default Udashboard;
