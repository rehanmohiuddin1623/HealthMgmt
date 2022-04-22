// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Patient {
    mapping(address=>PatientData) allPatients;
    address public owner = msg.sender;
      uint public patientId;

  function getPatientId() public returns (uint) {
    return patientId++;
  }
  
  function addPatient(address pId,string memory name,string memory age,string memory gender,string memory bloodGrp,string memory hosp,string memory addr,string memory device_id,string memory doctor) public returns(address){
      PatientData memory Pdata=PatientData(pId,name,age,gender,bloodGrp,hosp,addr,device_id,doctor,2);
      allPatients[pId]=(Pdata);
      return pId;
  }

 function getPatient(address  patId) public view returns ( address ,string memory  ,string memory ,string memory ,string memory ,string memory ,string memory ,string memory,string memory,uint) {
     PatientData memory Pdata=allPatients[patId];
     return ( Pdata._id,Pdata.patientName,Pdata.age,Pdata.gender,Pdata.bloodGroup,Pdata.Address,Pdata.hospital,Pdata.device_id,Pdata.doctorAssigned,Pdata.role);
 }

 function isValidPatient(address patId) public view returns(bool){
     PatientData memory pData=allPatients[patId];
     if(pData._id==patId) return true;
     else return false;
 }
 
}


struct PatientData {
    address _id;
    string patientName;
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