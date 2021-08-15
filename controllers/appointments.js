const Appointment = require("../models/Doctor/Appointment");
const Profile = require("../models/Doctor/Profile");

const scheduleAppointmentController = async (req, res) => {
    const {date, one, two, three} = req.body
    try {
        // console.log(req.body)
        const getProfile = await Profile.findOne({email: req.email})
        // console.log(getProfile)

        // checkduplicate dates
        const Dates = await Appointment.find({appointmentId: getProfile._id})
        console.log("Dates", Dates)
        const verifyDate = Dates.filter(date => date.date === req.body.date);
        console.log("verify",verifyDate)
        if(verifyDate.length > 0){
            return res.status(401).send("You have already scheduled an appointment on this date");
        }

        const scheduleAppointment = await Appointment({
            appointmentId: getProfile._id,
            date: req.body,date,
            firstSlot: Number(one),
            secondSlot: Number(two),
            thirdSlot: Number(three)
        });
        
        getProfile.appointments.push(scheduleAppointment);
        getProfile.save();
        scheduleAppointment.save();
        // console.log("appoint",scheduleAppointment)
        res.status(200).json("You have successfully set your schedule")
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong! Please check again!")
    }
}

const checkAppointments = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json("Something went wrong! Please check again!")
    }
}

module.exports = {
    scheduleAppointmentController,
    checkAppointments
}