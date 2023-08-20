const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ref_user: {
    type: Object,
    role: {
      type: Number,
      required: true
    },
    info: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: null
    },
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["doctor", "patient","admin"],
    default: "patient",
    required: true,
  },
  email: {
    type: String,
    required: false,
    default: null
  },
  pin: {
    type: String,
    required: true,
  }
});

module.exports = {
  User: mongoose.model("User", UserSchema),
};
