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
		type: Number,
		required: true
	},
	bbatch: {
		type: String,
		required: true
	},
	bpass: {
		type: String,
		required: true
	},
	bwallet: {
		type: Number,
		required: true
	}
});

module.exports = User = mongoose.model("Users", BuyerSchema);
