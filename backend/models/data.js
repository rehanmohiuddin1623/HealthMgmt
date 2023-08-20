const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  ref_user: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
  ref_doctor: {
    type: mongoose.Types.ObjectId,
    ref:"Doctor",
    required: true,
  },
  pulse: {
    type: String,
    required: true,
  },
  spo2: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    required: true,
  },
});

module.exports = {
  Data: mongoose.model("Data", dataSchema),
};
