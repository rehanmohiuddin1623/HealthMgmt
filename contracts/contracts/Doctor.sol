// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";

contract Doctor {
    mapping(address=>DoctorData) allDoctors;
    mapping (string=>PatientData) allPatients;
    address public owner = msg.sender;
      uint public patientId;

  function getPatientId() public returns (uint) {
    return patientId++;
  }

  Patient patient;
  
    function addDoctor(address pId,string memory name,string memory age,string memory gender,string memory bloodGrp,string memory hosp,string memory addr,string memory device_id,string memory doctor) public returns(address){
      DoctorData memory Ddata=DoctorData(pId,name,age,gender,bloodGrp,hosp,addr,device_id,doctor,1);
      allDoctors[pId]=(Ddata);
      return pId;
  }

    function getDcotor(address  patId) public view returns ( address ,string memory  ,string memory ,string memory ,string memory ,string memory ,string memory ,string memory,string memory,uint) {
     DoctorData memory Ddata=allDoctors[patId];
     return ( Ddata._id,Ddata.doctorName,Ddata.age,Ddata.gender,Ddata.bloodGroup,Ddata.Address,Ddata.hospital,Ddata.device_id,Ddata.doctorAssigned,Ddata.role);
 }

 function isDoctorValid(address docId) public view returns (bool){
     if(allDoctors[docId]._id==docId)return true;
     else return false;
 }
 
 
}


struct DoctorData {
    address _id;
    string doctorName;
    string age;
    string gender;
    string bloodGroup;
    string Address;
    string hospital;
    string device_id;
    string doctorAssigned;
    uint role;
}

/* 

1001:[
    {
        uint _id;
    string patientName;
    string age;
    string gender;
    string bloodGroup;
    string Address;
    string hospital;
    string device_id;
        }
]

*/