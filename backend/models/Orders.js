const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    ptime: {
        type: String,
        required: true
    },
    itemid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ishop: {
        type: String,
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
    iveg: {
        type: String,
        required: true
    },
    irating: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rated: {
        type: Boolean,
        requird: true
    }
})

module.exports = Order = mongoose.model("Orders", OrderSchema);
