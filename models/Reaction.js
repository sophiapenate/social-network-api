const { Schema, Types } = require("mongoose");
const formatDate = require("../utils/formatDate");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, "Reaction cannot be blank."],
      maxlength: [280, "Reaction cannot have more than 280 characters."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionSchema;
