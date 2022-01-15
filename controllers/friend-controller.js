const { User } = require("../models");

const friendController = {
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbData) => {
          if (!dbData) {
              res.status(404).json({ message: `No user found with id ${params.userId}!` });
              return;
          }
          res.json(dbData)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbData) => {
          if (!dbData) {
              res.status(404).json({ message: `No user found with id ${params.userId}!` });
              return;
          }
          res.json(dbData)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = friendController;
