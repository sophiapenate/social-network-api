const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Thought cannot be blank."],
      minlength: [1, "Thought must be between 1 and 280 characters."],
      maxlength: [280, "Thought must be between 1 and 280 characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    reactions: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;