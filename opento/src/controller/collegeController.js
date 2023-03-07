const collegeModel = require("../Models/collegeModel.js");

//********************************** Createing College ************************************************** */

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "request body is Empty" });
    const college = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: college });
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(400).send({ status: false, message: error.message });
    }
    if (error.code == 11000) {
      return res.status(400).send({
        status: false,

        message: `Duplicate value provided at ${Object.keys(
          error.keyValue
        )}: ${Object.values(error.keyValue)}`,
      });
    }
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createCollege = createCollege;
