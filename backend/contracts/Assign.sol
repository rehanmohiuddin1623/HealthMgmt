// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";
import "./Doctor.sol";

contract Assign {
    mapping(address=>  DoctorAssign[]) allAssignedPatients;
    mapping (string=>PatientData) allPatients;
    address public owner = msg.sender;
      uint public patientId;

  

  Patient patient;
  Doctor doctor;
  
    function AssignPatientToDoctor(address id,string memory doctor_name,address patient_addr) public returns(bool) {
        DoctorAssign memory AData= DoctorAssign(id,doctor_name,patient_addr);
        if(doctor.isDoctorValid(id)&&patient.isValidPatient(patient_addr)&&allAssignedPatients[id].length<5){
            allAssignedPatients[id].push(AData);
            return true;
        }
        return false;
    }

       function RemovePatientToDoctor(address patient_id,uint index) public returns(address) {
       delete allAssignedPatients[patient_id][index];
        return patient_id;
       }

    function getPatientsAssignedLength(address pId) public view returns(uint) {
        return allAssignedPatients[pId].length;
    }

    function getRole(address id) public view returns (string memory,address,int){
        if(id==0x61aD97cc2c283D1C5a605ad88222EC8bB7931FF6) return ("ROOT",id,0);
        else if(patient.isValidPatient(id)) return ("PATIENT",id,2);
        else if (doctor.isDoctorValid(id)) return ("DOCTOR",id,1);
        else return ("invalid id",id,-1);
    }
 
}


struct DoctorAssign {
    address _id;
    string doctorName;
    address patient ;
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