const { Thought } = require("../models");

const reactionController = {
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No thought found with id ${params.thoughtId}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res
            .status(404)
            .json({ message: `No thought found with id ${params.thoughtId}!` });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = reactionController;
