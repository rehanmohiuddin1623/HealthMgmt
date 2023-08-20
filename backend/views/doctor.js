const {
    getPatientsByMe, getPatientsData
} = require("../controllers/doctor")
const express = require("express");
const router = express.Router();

router.get("/getAllDoctors", getPatientsByMe);
router.post("/getAllPatients", getPatientsData);


module.exports = router;
