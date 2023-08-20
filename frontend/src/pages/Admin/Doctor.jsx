import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import "./index.css";
import Button from "../../components/Button";
import { buttonStyle, loaderType } from "../../util/constants";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { closeModal } from "../../util";
import { addDoctor, getAllDoctors, useDoctor } from "../../context/doctor";
import useLoader from "../../hooks/useLoader";
import { useHealth } from "../../context/health";

function Doctor() {
  const ref = useRef();
  const { dispatch, allDoctors } = useDoctor();
  const [loading, setLoader] = useLoader();

  const [doctorData, setDoctorData] = useState({
    doctorName: { name: "Doctor Name", value: "", placeholder: "Ex : Atif" },
    age: { name: "Age", value: "", placeholder: "Ex : 25" },
    gender: { name: "Gender", value: "", placeholder: "Ex : M/F/B " },
    bloodGroup: { name: "Blood Group", value: "", placeholder: "Ex : AB+" },
    Address: {
      name: "Address",
      value: "",
      placeholder: "Ex : H.No 17-xx Charminar Hyd",
      textarea: true,
    },
    phone: { name: "Phone No", value: "", placeholder: "Ex : 98xxxxxxxx" },
    // hospital: { value: "MEC Hospital" },
  });

  const doctorKeysArr = Object.keys(doctorData);

  const handleTyping = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDoctorData((_doctorData) => ({
      ..._doctorData,
      [name]: { ..._doctorData[name], value: value },
    }));
  };

  const getAllDoctor = async () => {
    setLoader(loaderType.DATA);
    dispatch({ ...(await getAllDoctors()) });
    setLoader(false);
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  const handleAddDoctor = async (e) => {
    const _data = {};
    doctorKeysArr.forEach(
      (_pKey, index) => _data[_pKey] = doctorData[_pKey].value
    );
    setLoader(loaderType.TRANSACTION);
    console.log({ _data, doctorData });
    await addDoctor(_data);
    setLoader(false);
    closeModal(e);
  };

  return (
    <HomeContainer loader={loading}>
      <div className="patient-container">
        <Modal
          modalRef={ref}
          title="Add A Doctor"
          trigger={
            <div className="add-patient-btn">
              <Button title={"Add Doctor"} type={buttonStyle.OUTLINE} />
            </div>
          }
        >
          <div className="add-patient-container">
            {doctorKeysArr.map((key) => (
              <Input
                onTyping={handleTyping}
                name={doctorData[key].name}
                type={doctorData[key].textarea ? "TEXTAREA" : "INPUT"}
                placeholder={doctorData[key].placeholder}
                label={key}
                value={doctorData[key].value}
              />
            ))}
            <div className="add-patient-footer">
              <Button
                callBack={(e) => closeModal(e)}
                title={"Cancel"}
                type={buttonStyle.OUTLINE}
              />
              <Button
                title={"Add"}
                type={buttonStyle.PRIMARY}
                callBack={handleAddDoctor}
              />
            </div>
          </div>
        </Modal>

        <div className="patients-list-container">
          <div className="header">
            <div>Doctor ID</div>
            <div>Name</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Blood Group</div>
            <div>Phone</div>
          </div>
          {allDoctors.map((doctor) => (
            <div className="patient-list">
              <div>{doctor._id}</div>
              <div>{doctor.name}</div>
              <div>{doctor.age}</div>
              <div>{doctor.gender}</div>
              <div>{doctor.bloodGroup}</div>
              <div>{doctor.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </HomeContainer>
  );
}

export { Doctor };
