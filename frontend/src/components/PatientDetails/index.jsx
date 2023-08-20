import React from "react";
import Button from "../Button";
import Modal from "../Modal";
import "./index.css";
import { buttonStyle } from "../../util/constants";
import "../Input/index.css";

function Index({ data, doctors, selectDoctor }) {

  const getValue = (data, key) => {
    if (typeof data[key] === "string") return data[key]

    return data[key]?.name
  }

  return (
    <div className="add-patient-container">
      {Object.keys(data).map(
        (key, index) =>
          index <= 7 && (
            <div className="input-container readonly">
              <div>{key} : </div>
              <input
                type={"text"}
                className="input"
                disabled={true}
                value={getValue(data, key)}
              />
            </div>
          )
      )}
      {doctors && !data?.doctorAssigned && (
        <div className="input-container readonly">
          <div>Select Doctor : </div>

          <select
            onChange={(e) => selectDoctor(e.target.value)}
            type={"text"}
            className="input"
          >
            <option value={{}}>Select</option>
            {doctors.map((doctor) => (
              <option value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Index;
