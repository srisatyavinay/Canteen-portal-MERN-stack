var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
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
    const newUser = new User({
        bname: req.body.bname,
        bemail: req.body.bemail,
        bnum: req.body.bnum,
        bage: req.body.bage,
        bbatch: req.body.bbatch,
        bpass: req.body.bpass,
        bwallet: req.body.bwallet
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
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

router.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ bemail: email}, (err, user) => {
        if(user){
            if(password === user.bpass ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
})

router.post("/:ID", (req, res) => {
    const newUser = {
        bname: req.body.bname,
        bemail: req.body.bemail,
        bnum: req.body.bnum,
        bage: req.body.bage,
        bbatch: req.body.bbatch,
        bpass: req.body.bpass,
    };

    User.findByIdAndUpdate(req.params.ID, newUser, {new: true}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json(user);
        }
    })
});

router.post("/money/:ID", (req, res) => {
    User.findById(req.params.ID, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json({money: user.bwallet});
        }
    })
});

router.post("/money/update/:ID", (req, res) => {
    User.findByIdAndUpdate(req.params.ID, {bwallet: req.body.money}, {new: true}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).json({money: user.bwallet});
        }
    })
});

module.exports = router;
