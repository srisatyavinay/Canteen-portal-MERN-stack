const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuyerSchema = new Schema({
	bname: {
		type: String,
		required: true
	},
	bemail: {
		type: String,
		required: true,
		unique: true
	},
	bnum: {
		type: String,
		required: true
	},
	bage: {
		type: String,
		required: true
	},
	bbatch: {
		type: String,
		required: true
	},
	bpass: {
		type: String,
		required: true
	}
});

//TODO: Add wallet details

module.exports = User = mongoose.model("Users", BuyerSchema);
