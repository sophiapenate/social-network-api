const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findById(params.id)
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No thought found with id ${params.id}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        )
        .populate({
          path: "friends",
          select: "-__v",
        })
        .populate({
          path: "thoughts",
          select: "-__v",
        });
      })
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No user found with username ${body.username}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No thought found with id ${params.id}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(params.id)
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No thought found with id ${params.id}!` });
          return;
        }
        res.json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
