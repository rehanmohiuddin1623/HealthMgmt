
/*

 pId: {
      name: "Patient Public Key",
      value: "",
      placeholder: "Ex : 0xaxxxx",
    },
    patientName: {
      name: "Patient Name",
      value: "",
      placeholder: "Ex : Atif",
    },
    age: { name: "Age", value: "", placeholder: "Ex : 25" },
    gender: { name: "Gender", value: "", placeholder: "Ex : M/F/B " },
    bloodGroup: { name: "Blood Group", value: "", placeholder: "Ex : AB+" },
    Address: {
      name: "Address",
      value: "",
      placeholder: "Ex : H.No 17-xx Charminar Hyd",
      textarea: true,
    },
    device_id: {
      name: "Device ID",
      value: "",
      placeholder: "Ex : 2ABCDXX",
    },
    phone: {
      name: "Phone No.",
      value: "+91",
      placeholder: "Ex : 987xxxxxxx",
    },

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    device_id: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    doctorAssigned:{
        type:mongoose.Types.ObjectId,
        ref:"Doctor",
        default:null
    }
})

module.exports = {
    Patient: mongoose.model("Patient", PatientSchema),
};