const mongoose = require("mongoose");
const Appointment = require("../model/appointment");
const Prize = require("../model/prize");

exports.create = (req, res) => {
  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    address: req.body.address
  });
  appointment.save().then(() => {
    const prizes = req.body.prizes;
    prizes.forEach(element => {
      const prize = new Prize({
        _id: new mongoose.Types.ObjectId(),
        name: element.name,
        description: element.description,
        appointment: appointment._id,
        code: ""
      });
      prize.save();
    });
    return res.status(200).json(appointment);
  });
};

exports.get = (req, res) => {
  Appointment.find().then(appointments => {
    return res.status(200).json(appointments);
  });
};

exports.prizes = (req, res) => {
  Appointment.find(mongoose.Types.ObjectId(req.params.id)).then(
    appointments => {
      if (appointments.length > 0) {
        Prize.find({
          code: "",
          appointment: mongoose.Types.ObjectId(req.params.id)
        }).then(prizes => {
          return res.status(200).json(prizes);
        });
      } else {
        return res.status(404).json({});
      }
    }
  );
};
