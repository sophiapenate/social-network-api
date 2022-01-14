const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required."],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      match: [/.+\@.+\..+/, 'Email not valid.'],
    },
    thoughts: [],
    friends: [UserSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

const User = model("User", UserSchema);

module.exports = User;
