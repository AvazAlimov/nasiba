const mongoose = require("mongoose");
const Prize = require("../model/prize");

exports.submit = (req, res) => {
  Prize.updateOne(
    {
      _id: req.body.id,
      user: { $exists: false }
    },
    {
      $set: {
        code: req.body.user
      }
    }
  ).then(prizes => {
    return res.status(200).json(prizes);
  });
};
