const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    docotor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor"
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "Patient"
    },
    created_date: {
        type: Date
    },
    role: {
        type: Number,
        required: true
    }
})

module.exports = {
    Admin: mongoose.model("Admin", AdminSchema),
};
