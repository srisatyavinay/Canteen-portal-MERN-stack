const mongoose = require("mongoose");
const Schema2 = mongoose.Schema;

// Create Schema
// const UserSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true
// 	},
// 	email: {
// 		type: String,
// 		required: true
// 	},
// 	date:{
// 		type: Date,
// 		required: false
// 	}
// });

const VendorSchema = new Schema2({
	vname: {
		type: String,
		required: true
	},
	vemail: {
		type: String,
		required: true,
		unique: true
	},
	vnum: {
		type: String,
		required: true
	},
	vshop: {
		type: String,
		required: true,
        unique: true
	},
	vopen: {
		type: String,
		required: true
	},
    vclose: {
        type: String,
        required: true
    },
	vpass: {
		type: String,
        required: true
	},
	vtotalorders: {
		type: Number,
		required: true
	},
	vactiveorders: {
		type: Number,
		required: true
	},
	vcompleted: {
		type: Number,
		required: true
	},
	vinacc: {
		type: Number,
		required: true
	}
});

//TODO: Change some of them to strings

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
