var express = require("express");
const ObjectID = require('mongodb').ObjectID;
var router = express.Router();

const Vendor = require("../models/Vendors");

router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

router.post("/vendorpost", (req, res) => {
    const newVendor = new Vendor({
        vname: req.body.vname,
        vemail: req.body.vemail,
        vnum: req.body.vnum,
        vshop: req.body.vshop,
        vopen: req.body.vopen,
        vclose: req.body.vclose,
        vpass: req.body.vpass,
        vtotalorders: req.body.vtotalorders,
        vactiveorders: req.body.vactiveorders,
        vcompleted: req.body.vcompleted,
        vinacc: req.body.vinacc
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body
    Vendor.findOne({ vemail: email }, (err, vendor) => {
        if (vendor) {
            if (password === vendor.vpass) {
                res.send({ message: "Login Successfull", vendor: vendor })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

router.post("/:ID", (req, res) => {
    const newVendor = {
        vname: req.body.vname,
        vemail: req.body.vemail,
        vnum: req.body.vnum,
        vshop: req.body.vshop,
        vopen: req.body.vopen,
        vclose: req.body.vclose,
        vpass: req.body.vpass,
    };

    Vendor.findByIdAndUpdate(req.params.ID, newVendor, { new: true }, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json(vendor);
        }
    })
});

router.post("/vinacc/get", (req, res) => {
    Vendor.findOne({vshop: req.body.ishop}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vinacc: vendor.vinacc});
        }
    })
});

router.post("/vinacc/incr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vinacc: 1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vinacc: vendor.vinacc});
        }
    })
});

router.post("/vinacc/decr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vinacc: -1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vinacc: vendor.vinacc});
        }
    })
});

router.post("/vactiveorders/incr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vactiveorders: 1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vactiveorders: vendor.vactiveorders});
        }
    })
});

router.post("/vactiveorders/decr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vactiveorders: -1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vactiveorders: vendor.vactiveorders});
        }
    })
});

router.post("/vcompleted/incr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vcompleted: 1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vcompleted: vendor.vcompleted});
        }
    })
});

router.post("/vtotalorders/incr", (req, res) => {
    Vendor.updateOne({vshop: req.body.ishop}, {$inc: {vtotalorders: 1}}, (err, vendor) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).json({vtotalorders: vendor.vtotalorders});
        }
    })
});

// router.post("/:postID", async (req, res) => {
//     const newVendor = new Vendor({
//         vname: req.body.vname,
//         vemail: req.body.vemail,
//         vnum: req.body.vnum,
//         vshop: req.body.vshop,
//         vopen: req.body.vopen,
//         vclose: req.body.vclose,
//         vpass: req.body.vpass,
//     });
//     try {
//         const updatedPost = await Vendor.findOneAndReplace(
//             {_id : req.params.postID},
//             { $set : newVendor}
//         );
//         res.status(200).json(updatedPost);
//     }
//     catch(err)
//     {
//         res.status(400).send(err);
//     }
// })

// router.post("/vendoredit", (req, res)=> {
//     const newVendor = new Vendor({
//         vname: req.body.vname,
//         vemail: req.body.vemail,
//         vnum: req.body.vnum,
//         vshop: req.body.vshop,
//         vopen: req.body.vopen,
//         vclose: req.body.vclose,
//         vpass: req.body.vpass,
//     });
//     // const { email, password} = req.body
//     Vendor.findOneAndReplace({ vemail: newVendor.vemail}, newVendor, null, (err, vendor) => {
//         if(err){
//             res.status(400).send(err);
//         } else {
//             res.status(200).json({vendordetails: vendor});
//         }
//     })
// })

module.exports = router;
