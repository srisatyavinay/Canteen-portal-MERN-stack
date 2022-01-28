const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    iname: {
        type: String,
        required: true
    },
    iprice: {
        type: Number,
        required: true
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
    ishop: {
		type: String,
		required: true
	}
})

module.exports = Fitem = mongoose.model("Fitem", FavoriteSchema);
