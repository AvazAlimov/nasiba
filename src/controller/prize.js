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
  ).then(operation => {
    if (operation.nModified > 0) {
      return res.status(200).json({ code: req.body.user });
    } else {
      return res.status(400).json({});
    }
  });
};
