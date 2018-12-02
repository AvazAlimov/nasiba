const express = require("express");
const router = express.Router();

const Appointment = require("../controller/appointment");
const Prize = require("../controller/prize");

module.exports = app => {
  app.use("/api/appointment", [
    router.post("/create", Appointment.create),
    router.get("/", Appointment.get),
    router.get("/prizes/:id", Appointment.prizes)
  ]);

  app.use("/api/prize", [router.post("/submit", Prize.submit)]);
};
