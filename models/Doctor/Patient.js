const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    appointmentId:{
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    },
    docEmail:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String
    },
    patientId:{
        type: Number,
        required: true
    },
    slot:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
});

const Patient = new mongoose.model("Patient",PatientSchema);

module.exports = Patient;