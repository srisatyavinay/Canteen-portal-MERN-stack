var express = require("express");
var router = express.Router();

// Load User model
const Item = require("../models/Items");
// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
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
        iaddons: req.body.iaddons,
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
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

