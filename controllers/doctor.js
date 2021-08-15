const { ProfileImageStorage } = require("../config/ProfileImageUpload");
const Profile = require("../models/Doctor/Profile");

const editProfileController = async (req, res) => {
    const { firstname, lastname, email, description, address, specializations } = req.body;
    ProfileImageStorage(req, res, async (err) => {
        try {
            if (err) {
                console.log(err)
            }
            console.log(req.body)
            const updateDoc = { firstname: req.body.firstname, lastname: req.body.lastname, description: req.body.description, address: req.body.address, specializations: req.body.specializations }
            console.log("DOCUMENTS", updateDoc)
            if (req.file) {
                const editProfile = await Profile.findOneAndUpdate({ email: req.email }, { ...updateDoc, image: req.file.transforms[0].location });
                await editProfile.save()
                console.log(editProfile)
                return res.status(200).json("Successfully updated the profile")
            }
            const editProfile = await Profile.findOneAndUpdate({ email: req.email }, updateDoc);
            await editProfile.save()
            res.status(200).json("Successfully updated the profile");
        } catch (error) {
            console.log(error)
            return res.status(500).json("Something went wrong! Please try again")
        }
    })
}

const viewProfileController = async (req, res) => {
    try {
        if (req.email) {
            const info = await Profile.findOne({ email: req.email});
            console.log("info",info)
            return res.status(200).json(info);
        }else{
            const info = await Profile.findById({_id: req.id});
            console.log("info",info)
            return res.status(200).json(info);
        }

    } catch (error) {
        return res.status(500).json("Something went wrong! Please try again")
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await Profile.find();
        res.status(200).send(doctors)
    } catch (error) {
        return res.status(500).json("Something went wrong! Please try again")
    }
}

module.exports = {
    editProfileController,
    viewProfileController,
    getAllDoctorsController
}