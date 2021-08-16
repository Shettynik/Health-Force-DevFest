const express = require("express");
const { scheduleAppointmentController } = require("../controllers/appointments");
const { bookAppointmentController, getBookedAppointments, getMyAppointmentsController } = require("../controllers/bookAppointments");
const { verifyPatient } = require("../middlewares/verifyPatient");
const { verifyDoctor } = require("../middlewares/verifyRole");
const router = express.Router();

router.route("/schedule").post(verifyDoctor, scheduleAppointmentController);
router.route("/book").post(verifyPatient ,bookAppointmentController);
router.route("/myappointments").get(verifyPatient, getMyAppointmentsController);
router.route("/").get(verifyDoctor, getBookedAppointments);

module.exports = router;