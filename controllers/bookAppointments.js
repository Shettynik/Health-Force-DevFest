const Profile = require("../models/Doctor/Profile");
const Appointment = require("../models/Doctor/Appointment");
const Patient = require("../models/Doctor/Patient");
const User = require('../models/User');

const bookAppointmentController = async (req, res) => {
    const { firstname, lastname, id, slot, date } = req.body;
    try {
        const findDoctor = await Profile.find({ _id: id }).populate("appointments");
        const docEmail = findDoctor[0].email;
        const appointments = findDoctor[0].appointments;
        const Date = appointments.filter(appointment => appointment.date === date);
        console.log(Date)
        if (Date.length === 0) {
            return res.status(403).json({error: "No slots available !"})
        }
        if ((slot == "firstSlot" && Date[0].firstSlot === 0) || (slot == "secondSlot" && Date[0].secondSlot === 0) || (slot == "thirdSlot" && Date[0].thirdSlot === 0)) {
            return res.status(403).json({error: "No free slots available !"})
        } else {
            if (slot == "firstSlot") {
                Date[0].firstSlot -= 1
            }
            else if (slot === "secondSlot") {
                Date[0].secondSlot -= 1
            }
            else if (slot === "thirdSlot") {
                Date[0].thirdSlot -= 1
            }
        }

        const uniqueCode = Math.floor(Math.random()*10000);
        const addPatient = new Patient({docEmail: docEmail, email:req.email, firstname, lastname, appointmentId: Date[0]._id, slot, patientId: uniqueCode, date });
        console.log(addPatient)
        Date[0].patients.push(addPatient);
        Date[0].save()
        addPatient.save()

        res.status(200).send("Your appointment has been booked successfully!");
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong! Please check again!")
    }
}

const getBookedAppointments = async (req, res) => {
    const { date } = req.query;
    try {
        // console.log(date)
        const patients = await Patient.find({docEmail: req.email})
        console.log("PATIENTS",patients)
        const patientsForTheDay = patients.filter(patient => patient.date === date);
        console.log("PATIENTS",patientsForTheDay)
        res.status(200).json(patientsForTheDay)
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong! Please check again!")
    }
}

const getMyAppointmentsController = async (req, res) => {
    try {
        const myAppointments = await Patient.find({email: req.email});
        console.log(myAppointments)
        res.status(200).json(myAppointments);
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong! Please check again!")
    }
}

module.exports = {
    bookAppointmentController,
    getBookedAppointments,
    getMyAppointmentsController
}