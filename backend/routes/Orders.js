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
        uname: req.body.uname,
        ptime: req.body.ptime,
        itemid: req.body.itemid,
        iname: req.body.iname,
        iprice: req.body.iprice,
        irating: req.body.irating,
        ishop: req.body.ishop,
        iveg: req.body.iveg,
        quantity: req.body.quantity,
        status: req.body.status,
        rated: req.body.rated
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

router.post("/vendor_orders", (req, res) => {
    const ishop = req.body.ishop
    Order.find({ ishop: ishop }, (err, orderlist) => {
        res.status(200).send({ orderlist: orderlist })
    })
})

router.post("/:ID", (req, res) => {
    const update = {
        status: req.body.status
    };

    Order.findByIdAndUpdate(req.params.ID, update, {new: true}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json(user);
        }
    })
})

router.post("/rate/:ID", (req, res) => {
    const update = {
        rated: true
    };

    Order.findByIdAndUpdate(req.params.ID, update, {new: true}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json(user);
        }
    })
})

module.exports = router;
