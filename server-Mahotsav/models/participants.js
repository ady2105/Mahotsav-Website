const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: Number ,
      required: true,
    },
  },
  { timestamps: true }
);

const Participants = mongoose.model("participants", participantSchema);

module.exports = Participants;