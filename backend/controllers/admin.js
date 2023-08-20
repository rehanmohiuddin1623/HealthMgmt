const { ObjectId } = require("mongodb");
const { Admin } = require("../models/admin");
const { Data } = require("../models/data");
const { Doctor } = require("../models/doctor");
const { Patient } = require("../models/patient");
const { User } = require("../models/user");

const getAllDoctors = async (req, res) => {
    try {
        const data = await Doctor.find({}).lean();
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const data = await Patient.find({}).populate("doctorAssigned").lean();
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const getPatientsByDoctor = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const data = await Patient.find({ doctorAssigned: doctor_id }).populate("doctorAssigned").lean();
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const getPatientsData = async (req, res) => {
    try {
        const { doctor_id } = req.query
        const data = await Data.find({ doctorAssigned: doctor_id }).lean();
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const createPatient = async (req, res) => {
    try {
        const { patientName, age, gender, bloodGroup, Address, phone, email } = req.body
        const patient = {
            name: patientName, age, gender, bloodGroup, address: Address, phone
        }
        const data = await Patient.create({ ...patient })
        await User.create({
            name: patientName,
            ref_user: {
                type: Object,
                role: 2,
                info: data._id,
            },
            phone: phone,
            type: "patient",
            pin: Math.floor(1000 + Math.random() * 9000).toString(),
        })
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const createDoctor = async (req, res) => {
    try {
        const { doctorName, age, gender, bloodGroup, Address, phone, email } = req.body
        const doctor = {
            name: doctorName, age, gender, bloodGroup, address: Address, phone
        }
        const data = await Doctor.create({ ...doctor })
        await User.create({
            name: doctorName,
            ref_user: {
                type: Object,
                role: 1,
                info: data._id,
            },
            phone: phone,
            type: "doctor",
            pin: Math.floor(1000 + Math.random() * 9000).toString(),
        })
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};

const assignDoctorToPatient = async (req, res) => {
    try {
        const { patient_id, doctor_id } = req.query
        const data = await Patient.findByIdAndUpdate({ _id: patient_id }, { doctorAssigned: doctor_id }, { new: true })
        res.status(200).send({
            message: data,
        });
    } catch (e) {
        res.status(500).send({
            message: e.toString(),
        });
    }
};



module.exports = {
    getAllDoctors,
    getAllPatients,
    getPatientsByDoctor,
    createPatient,
    createDoctor,
    getPatientsData,
    assignDoctorToPatient
};