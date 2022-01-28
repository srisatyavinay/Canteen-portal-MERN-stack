var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");

router.get("/", function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.json({ orderlist: orders });
        }
    })
});

router.post("/register", (req, res) => {
    const newOrder = new Order({
        userid: req.body.userid,
        itemid: req.body.itemid,
        iname: req.body.iname,
        iprice: req.body.iprice,
        irating: req.body.irating,
        ishop: req.body.ishop,
        quantity: req.body.quantity,
        status: req.body.status
    });

    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/user_orders", (req, res) => {
    const userid = req.body.userid
    Order.find({ userid: userid }, (err, orderlist) => {
        res.status(200).send({ orderlist: orderlist })
    })
})

module.exports = router;
