const {
    getLatestData,
    getPatientHistory
} = require("../controllers/patient")
const express = require("express");
const router = express.Router();

router.get("/getLatestData", getLatestData);
router.post("/getPatientHistory", getPatientHistory);


module.exports = router;
