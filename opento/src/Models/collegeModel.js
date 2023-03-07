const mongoose = require("mongoose");
const validator = require("validator");
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide college name"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Please provide college Full Name"],
      trim: true,
    },
    logoLink: {
      type: String,
      required: [true, "Please provide Logo Link"],
      validate: [validator.isURL, "Please provide a valid URL"],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
 
// document middleware 
collegeSchema.pre("save", function (next) {
  const words = this.fullName.split(" ");
  this.fullName = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  next();
});
module.exports = mongoose.model("college", collegeSchema);
