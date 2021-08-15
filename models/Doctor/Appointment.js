const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appointmentId:{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    date:{
        type: String,
        required: true
    },
    firstSlot:{
        type: Number,
        default: 0
    },
    secondSlot:{
        type: Number,
        default: 0
    },
    thirdSlot:{
        type: Number,
        default: 0
    },
    patients:[{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    }]
});

const Appointment = new mongoose.model("Appointment",AppointmentSchema);

module.exports = Appointment;