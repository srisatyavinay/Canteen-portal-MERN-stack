var express = require("express");
var router = express.Router();

// Load User model
const Fitem = require("../models/Favorites");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Fitem.find(function (err, fitems) {
        if (err) {
            console.log(err);
        } else {
            res.json({ favorites: fitems });
        }
    })
});

router.post("/register", (req, res) => {
    const newFitem = new Fitem({
        userid: req.body.userid,
        iname: req.body.iname,
        iprice: req.body.iprice,
        irating: req.body.irating,
        iveg: req.body.iveg,
        itags: req.body.itags,
        ishop: req.body.ishop,
    });

    newFitem.save()
        .then(fitem => {
            res.status(200).json(fitem);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/:ID", (req, res) => {
    // const userid = req.body.userid
    Fitem.find({ userid: req.params.ID }, (err, fitemlist) => {
        res.status(200).send({ favorites: fitemlist })
    })
})

module.exports = router;
