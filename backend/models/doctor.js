/*

    dId: { name: "Doctor Public Key", value: "", placeholder: "Ex : 0xaxxxx" },
    doctorName: { name: "Doctor Name", value: "", placeholder: "Ex : Atif" },
    age: { name: "Age", value: "", placeholder: "Ex : 25" },
    gender: { name: "Gender", value: "", placeholder: "Ex : M/F/B " },
    bloodGroup: { name: "Blood Group", value: "", placeholder: "Ex : AB+" },
    Address: {
      name: "Address",
      value: "",
      placeholder: "Ex : H.No 17-xx Charminar Hyd",
      textarea: true,
    },
    phone: { name: "Phone No", value: "+91", placeholder: "Ex : 98xxxxxxxx" },

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: { type: String },
    age: { type: String },
    gender: { type: String },
    bloodGroup: { type: String },
    address: {
        type: String
    },
    phone: { type: String },
})

module.exports = {
    Doctor: mongoose.model("Doctor", DoctorSchema),
};