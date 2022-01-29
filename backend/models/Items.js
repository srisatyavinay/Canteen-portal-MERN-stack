const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	iname: {
		type: String,
		required: true,
        // unique: true
	},
	iprice: {
		type: Number,
		required: true,
	},
	irating: {
		type: Number,
		required: true
	},
	iveg: {
		type: String,
		required: true
	},
	itags: {
		type: Map,
		required: true
	},
	// iaddons: {
	// 	type: String,
	// 	required: true
	// },
	ishop: {
		type: String,
		required: true
	},
	numtimes: {
		type: Number,
		required: true
	}
});

module.exports = Item = mongoose.model("Items", ItemSchema);
