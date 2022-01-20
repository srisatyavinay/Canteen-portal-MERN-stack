var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendors");

router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
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
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
