const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    image:{
        type: String,
        default: ""
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ""
    },
    address:{
        type: String,
        default: ""
    },
    specializations:[{
        type: String,
        default: ""
    }],
    appointments:[
        {
            type: Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

const Profile = new mongoose.model("Profile", ProfileSchema);

module.exports = Profile;