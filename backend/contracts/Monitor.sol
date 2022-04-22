// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";
import "./Doctor.sol";

contract Monitor {
    mapping(address=>PatientMonitor[]) allPatientData;
    mapping (string=>PatientData) allPatients;
    address public owner = msg.sender;
      uint public patientId;

  

  Patient patient;
  Doctor doctor;
  
    function addPatientData(address patId,string memory id,string memory pulse,string memory spo2,string memory temp) public returns(bool) {
        PatientMonitor memory PatientMonitorData= PatientMonitor(id,pulse,spo2,temp);
        if(patient.isValidPatient(patId)) {
            allPatientData[patId].push(PatientMonitorData);
            return true;
        }
        return false;
    }

    function getPatientData(address patId) public view returns(string memory,string memory,string memory,string memory){
          PatientMonitor memory PatientMonitorData=allPatientData[patId][0];
           if(patient.isValidPatient(patId)){
          return (PatientMonitorData._id,PatientMonitorData.pulse,PatientMonitorData.spo2,PatientMonitorData.temp);
           }
           else {
               return ("","","","");
           }
    }
 
}


struct PatientMonitor {
    string _id;
    string pulse;
    string spo2;
    string temp;
}

