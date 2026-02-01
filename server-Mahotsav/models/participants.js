const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    Team_Name: {
      type: String,
      required: true,
    },
    Team_Leader: {
      type: String,
      required: true,
    },
    Leader_Email: {
      type: String,
      required: true,
      unique: true,
    },
    Leader_MobileNo: {
      type: Number ,
      required: true,
    },
    Leader_Branch: {
      type: String,
      required: true,
    },
    Members: [{
      Name: String,
      Email: String,
      Mobile_No: Number,
      Branch: String
    }]
  },
  { timestamps: true }
);

const BrushAttack = mongoose.model("brushAttack", participantSchema);
const Kirigami = mongoose.model("kirigami", participantSchema);



module.exports = {
  BrushAttack,
  Kirigami,
}

/*

const teamSchema = new mongoose.Schema({
  event_Name: String,
  team_Name: String,
  team_leader: String,
  leader_email: String,
  leader_mobileNo: Number,
  leader_branch: String,
  members: [
    {
      name: String,
      email: String,
      branch: String
    }
  ]
});

*/



// const mongoose = require("mongoose");

// const participantSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     event: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     branch: {
//       type: String,
//       required: true,
//     },
//     year: {
//       type: Number ,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Participants = mongoose.model("participants", participantSchema);

// module.exports = Participants;