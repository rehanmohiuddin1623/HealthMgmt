const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const DataRoute = require("./views/data");
const DoctorRoute = require("./views/doctor");
const PatientRoute = require("./views/patient");
const AdminRoute = require("./views/admin");
const AuthRoute = require("./views/user")

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED"))
  .catch((err) => console.error(err));

app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API");
});

app.use("/", DataRoute);
app.use("/doctor", DoctorRoute);
app.use("/patient", PatientRoute);
app.use("/admin", AdminRoute);
app.use("/user", AuthRoute);

server.listen(process.env.PORT, () => {
  console.log("Server Started At Port : " + process.env.PORT);
});

function generateRandom(type) {
  return type === "NORMAL"
    ? {
      type: "NORMAL",
      pulse: Math.random() * (140 - 60) + 60,
      spo2: Math.random() * (99 - 94) + 94,
      temp: Math.random() * (99 - 96) + 96,
    }
    : {
      type: "CRITICAL",
      pulse: (Math.random() * (150 - 120) + 40).toFixed(2).toString(),
      spo2: (Math.random() * (90 - 50) + 50).toFixed(2).toString(),
      temp: (Math.random() * (150 - 100) + 100).toFixed(2).toString(),
    };
}



