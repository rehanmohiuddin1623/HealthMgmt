const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const Web3 = require("web3");
const { abi, networks } = require("./build/contracts/Patient.json");
const { patientData } = require("./constants");

const initializeWeb3 = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  const patient = new web3.eth.Contract(abi, networks[5777].address);
  console.log(patient.methods);
  const {
    patientName,
    age,
    gender,
    bloodGroup,
    Address,
    hospital,
    device_id,
    doctorAssigned,
  } = patientData;
  // const pat = await patient.methods
  //   .addPatient(
  //     "2",
  //     "patientName",
  //     age,
  //     gender,
  //     bloodGroup,
  //     Address,
  //     hospital,
  //     device_id,
  //     doctorAssigned
  //   )
  //   .send({ from: accounts[0], gas: 6721975 });
  const getPat = await patient.methods.getPatient("2").call();
  console.log({ getPat });
};

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
  initializeWeb3(web3);
} else {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:7545")
  );
  initializeWeb3(web3);
}

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
  res.send(" API");
});

server.listen(process.env.PORT, () => {
  console.log("Server Started At Port : " + process.env.PORT);
});
