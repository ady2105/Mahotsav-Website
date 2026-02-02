const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
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
    Leader_Mobile_No: {
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
      Mobile: Number,
      Branch: String
    }]
  },
  { timestamps: true }
);

const individualSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Mobile_Number: {
      type: Number ,
      required: true,
    },
    Branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Kirigami = mongoose.model("Kirigami", individualSchema);
const Calligraphy = mongoose.model("Calligraphy", individualSchema);
const Scandal = mongoose.model("Scandal", individualSchema);
const Comicstan = mongoose.model("Comicstan", individualSchema);

const PaperInVogue = mongoose.model("Paper-In-Vogue", teamSchema);
const SpotSketching = mongoose.model("Spot-Sketching", teamSchema);
const FacePainting = mongoose.model("Face-Painting", teamSchema);
const RoadPainting = mongoose.model("Road-Painting", teamSchema);
const Masquerade = mongoose.model("Masquerade", teamSchema);
const Clickomania = mongoose.model("Click-O-Mania", teamSchema);

module.exports = {
  teamSchema,
  individualSchema,
  Kirigami,
  Calligraphy,
  Scandal,
  Comicstan,
  PaperInVogue,
  SpotSketching,
  FacePainting,
  RoadPainting,
  Masquerade,
  Clickomania
}