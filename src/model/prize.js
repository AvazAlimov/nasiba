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
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    require: true
  },
  code: {
    type: String
  }
});

module.exports = mongoose.model("Prize", scheme);
