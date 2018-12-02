const mongoose = require("mongoose");

const scheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    address: {
        type: String
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    }
});

module.exports = mongoose.model("Appointment", scheme);