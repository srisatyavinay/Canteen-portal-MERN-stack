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
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
