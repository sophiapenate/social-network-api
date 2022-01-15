const { User, Thought } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find()
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findById(params.id)
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No user found with id ${params.id}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No user found with id ${params.id}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No user found with id ${params.id}!` });
          return;
        }

        return dbData.thoughts;
      })
      .then((thoughtsArr) => {
        Thought.remove({ _id: { $in: thoughtsArr } })
          .then(res.json({ message: "User successfully deleted!" }))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
