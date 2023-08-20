const {
    getAllDoctors,
    getAllPatients,
    getPatientsByDoctor,
    createPatient,
    createDoctor,
    getPatientsData,
    assignDoctorToPatient
} = require("../controllers/admin")
const express = require("express");
const router = express.Router();

router.get("/getAllDoctors", getAllDoctors);
router.get("/getAllPatients", getAllPatients);
router.get("/getPatientsByDoctor", getPatientsByDoctor);
router.post("/addPatient", createPatient);
router.post("/addDoctor", createDoctor);
router.get("/patient/data", getPatientsData);
router.put("/assignDoctor", assignDoctorToPatient)

module.exports = router;
