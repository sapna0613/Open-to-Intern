const express = require("express");
const route = express.Router();
module.exports = route;

const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

route.post("/functionup/colleges", collegeController.createCollege);

route.post("/functionup/interns", internController.interns);
route.get("/functionup/collegeDetails", internController.getInterns);

//////Handling unhandled route//////////
route.all("*", (req, res) => {
  res.status(404).send(`Cannot find ${req.originalUrl}`);
});
////////////////////////////////////////
