const express = require("express");
const router = express.Router();

const Appointment = require("../controller/appointment");

module.exports = app => {
    app.use("/api/appointment", [
        router.post("/create", Appointment.create)
    ])
};