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
const monitor = require("./build/contracts/Monitor.json");
const { patientData } = require("./constants");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const initializeWeb3 = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  const patient = new web3.eth.Contract(abi, networks[3].address);
  const Monitor = new web3.eth.Contract(
    monitor.abi,
    monitor.networks[3].address
  );
  const totalLength = await patient.methods.totalPatientsLength().call();
  console.log(totalLength);

  let count = 0;
  io.on("connection", (socket) => {
    setInterval(async () => {
      for (let i = 0; i < totalLength; i++) {
        const pId = await patient.methods.getPatientId(i).call();
        console.log({ pId });
        const { pulse, spo2, temp } = generateRandom("NORMAL");
        count++;
        if (count === 3) {
          const { pulse, spo2, temp } = generateRandom("CRITICAL");
          console.log(pulse, spo2, temp);
          const tid = await Monitor.methods
            .addPatientData(
              pId,
              pulse.toString(),
              spo2.toString(),
              temp.toString()
            )
            .send({ from: accounts[0], gas: 6721975 });

          count = 0;
        }
        socket.emit(pId.toLowerCase(), {
          pulse: pulse,
          spo2: spo2,
          temp: temp,
        });
      }
    }, 3000);
  });
};

function generateRandom(type) {
  return type === "NORAML"
    ? {
        type: "NORMAL",
        pulse: Math.random() * (140 - 60) + 60,
        spo2: Math.random() * (99 - 94) + 94,
        temp: Math.random() * (99 - 96) + 96,
      }
    : {
        type: "CARITICAL",
        pulse: (Math.random() * (150 - 120) + 40).toFixed(2).toString(),
        spo2: (Math.random() * (90 - 50) + 50).toFixed(2).toString(),
        temp: (Math.random() * (150 - 100) + 100).toFixed(2).toString(),
      };
}

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
  initializeWeb3(web3);
} else {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/8c423580f9cf440999999783eabccfeb"
    )
  );
  console.log({ web3 });
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
  res.send("API");
});

server.listen(process.env.PORT, () => {
  console.log("Server Started At Port : " + process.env.PORT);
});
