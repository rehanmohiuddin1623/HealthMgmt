const {
    registerUser,
    getUser,
    login
} = require("../controllers/user")
const express = require("express");
const router = express.Router();

router.get("/get", getUser);
router.post("/login", login);
router.post("/register", registerUser);

module.exports = router;