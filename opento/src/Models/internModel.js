const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const validator = require("validator");
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your emailID"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid Email-ID"],
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      min: [1000000000, "Please provide valid mobile number"], 
      max: [9999999999, "Please provide a valid mobile number"],
      trim: true,
    },
    collegeId: {
      type: ObjectId,
      ref: "college",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("intern", internSchema);
