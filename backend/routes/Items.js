var express = require("express");
var router = express.Router();

// Load User model
const Item = require("../models/Items");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json({ itemlist: items });
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newItem = new Item({
        iname: req.body.iname,
        iprice: req.body.iprice,
        irating: req.body.irating,
        iveg: req.body.iveg,
        itags: req.body.itags,
        ishop: req.body.ishop,
        numtimes: req.body.numtimes
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/shop_items", (req, res) => {
    const shop = req.body.shop
    Item.find({ ishop: shop }, (err, itemlist) => {
        res.status(200).send({ itemlist: itemlist })
    })
})

router.post("/:ID", (req, res) => {
    Item.findByIdAndDelete(req.params.ID, (err, item) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json(item);
        }
    })
})

router.post("/edit/:ID", (req, res) => {
    const newItem = {
        iname: req.body.iname,
        iprice: req.body.iprice,
        irating: req.body.irating,
        iveg: req.body.iveg,
        itags: req.body.itags,
        ishop: req.body.ishop,
    };
    Item.findByIdAndUpdate(req.params.ID, newItem, {new: true}, (err, item) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json(item);
        }
    })
})

router.post("/numtimes/incr", (req, res) => {
    Item.updateOne({_id: req.body.itemid}, {$inc: {numtimes: 1}}, (err, item) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({numtimes: item.numtimes});
        }
    })
});

// POST request 
// Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

// router.post("/login", (req, res)=> {
//     const { email, password} = req.body
//     User.findOne({ bemail: email}, (err, user) => {
//         if(user){
//             if(password === user.bpass ) {
//                 res.send({message: "Login Successfull", user: user})
//             } else {
//                 res.send({ message: "Password didn't match"})
//             }
//         } else {
//             res.send({message: "User not registered"})
//         }
//     })
// }) 

module.exports = router;
