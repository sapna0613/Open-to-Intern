const InternModel = require("../Models/internModel");
const CollegeModel = require("../Models/collegeModel");

//************************************* Create Interns **************************** */

exports.interns = async (req, res) => {
 // res.setHeader("Access-Control-Allow-Origin","*")
  try {
    if (!req.body.collegeName || req.body.collegeName.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the college name" });
    }
    let capitalizeCollegeName = req.body.collegeName.split(" ");  
    if (capitalizeCollegeName.length > 1) {
      capitalizeCollegeName = capitalizeCollegeName
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }
    const college = await CollegeModel.findOne({
      $or: [
        { name: req.body.collegeName },
        { fullName: capitalizeCollegeName },
      ],
    });
    if (!college) {
      return res
        .status(400)
        .send({ status: false, message: "No college exist with this name" });
    }
    const collegeID = college._id;
    req.body.collegeId = collegeID;
    let interns = await InternModel.create(req.body);
    interns = await interns.populate("collegeId", "name fullName logoLink");
    return res.status(201).send({
      status: true,
      message: "Intern Created Successfully",
      data: interns,
    });
  } catch (err) {
    if (err.name == "ValidationError") {
      return res.status(400).send(err.message);
    }
    if (err.code == 11000) {
      return res.status(400).send({
        status: false,
        message: `Duplicate value provided at ${Object.keys(
          err.keyValue
        )}: ${Object.values(err.keyValue)} already exist`,
      });
    }
    return res.status(500).send({ status: false, message: err.message });
  }
};

//********************************************* Get All Interns ****************************  */

exports.getInterns = async (req, res) => {
// res.setHeader("Access-Control-Allow-Origin","*")
  try {
    if (!req.query.collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide the college name" });
    }
    const college = await CollegeModel.findOne({ name: req.query.collegeName });
    if (!college) {
      return res
        .status(400)
        .send({ status: false, message: "No college found with this name" });
    }
    const collegeId = college._id;
    const intern = await InternModel.find({ collegeId: collegeId });
    if (intern.length == 0) {
      return res.status(200).send({
        status: true,
        data: {
          name: college.name,
          fullName: college.fullName,
          logoLink: college.logoLink,
          interns: "No interns have applied to this college yet",
        },
      });
    }
    return res.status(200).send({
      data: {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: intern,
      },
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
