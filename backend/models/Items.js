const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	iname: {
		type: String,
		required: true,
        unique: true
	},
	iprice: {
		type: String,
		required: true,
	},
	irating: {
		type: String,
		required: true,
        default: '0'
	},
	iveg: {
		type: String,
		required: true
	},
	itags: {
		type: String,
		required: true
	},
	iaddons: {
		type: String,
		required: true
	}
});

module.exports = Item = mongoose.model("Items", ItemSchema);
