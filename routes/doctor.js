const express = require("express");
const { viewProfileController, editProfileController, scheduleController, getAllDoctorsController } = require("../controllers/doctor");
const { verifyDoctor } = require("../middlewares/verifyRole");
const { viewAuth } = require("../middlewares/viewAuth");
const router = express.Router();

router.route("/view").get(viewAuth, viewProfileController);
router.route("/edit").put(verifyDoctor, editProfileController);
router.route("/").get(getAllDoctorsController);

module.exports = router;