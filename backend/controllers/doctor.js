const { Data } = require("../models/data");
const { Doctor } = require("../models/doctor");
const { Patient } = require("../models/patient");

const getPatientsByMe = async (req, res) => {
    try {
        const data = await Patient.find({ doctorAssigned: req.query.user_id }).lean();
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
        const { user_id } = req.query
        const data = await Data.find({ ref_doctor: user_id }).sort("-date").limit(10).lean();
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
    getPatientsByMe, getPatientsData
}