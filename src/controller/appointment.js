const mongoose = require("mongoose");
const Appointment = require("../model/appointment");
const Company = require("../model/company");

exports.create = (req, res) => {
    console.log(req.body);
    Company.find({
        _id: mongoose.Types.ObjectId(req.body.company)
    }).then(companies => {
        if (companies.length > 0) {
            const appointment = new Appointment({
                _id: new mongoose.Types.ObjectId(),
                name: "Name",
                date: "Date",
                address: "Address",
                company: companies[0]._id
            });
            appointment.save().then(() => {
                return res.status(200).json(appointment);
            })
        } else {
            return res.status(404).json({
                message: "not"
            });
        }
    }).catch(err => {
        return res.status(404).json({
            message: "not"
        });
    });
};