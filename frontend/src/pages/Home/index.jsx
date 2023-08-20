import React, { useEffect, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import { assignContract } from "../../contractEther/assign";
import { ethers } from "ethers";
import { getRole, useHealth } from "../../context/health";
import useCheckWallet from "../../hooks/useCheckWallet";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import "./index.css";

import { Navigate } from "react-router-dom";

function Index() {
  const [userData, setUserData] = useState({
    phone: "",
    pin: ""
  })
  const [currentAccount, loginHandler] = useCheckWallet();
  const { type, _id, role, dispatch } = useHealth();
  const Options = [
    {
      name: "Select Role",
      value: null
    },
    {
      name: "Admin",
      value: "admin"
    },
    {
      name: "Doctor",
      value: "doctor"
    },
    {
      name: "Patient",
      value: "patient"
    }
  ]

  const connectWalletButton = () => {
    return (
      <div className="btn-container">
        <Input placeholder={"Enter Phone No"} onTyping={(e) => setUserData({ ...userData, phone: e.target.value })} />
        <Input placeholder={"Enter Pin"} onTyping={(e) => setUserData({ ...userData, pin: e.target.value })} />
        <Button callBack={() => loginHandler({...userData})} title="Log In" />
      </div>
    );
  };

  const getRoleContract = async () =>
    currentAccount && dispatch({ ...(await getRole()) });

  useEffect(() => {
    getRoleContract();
  }, [currentAccount]);

  const renderRoute = {
    0: <Navigate to={"/admin/doctor"} />,
    1: <Navigate to={"/doctor"} />,
    2: <Navigate to={"/patient/monitor"} />,
    [-1]: <div>Error</div>,
  };

  return (
    <HomeContainer>
      {currentAccount ? renderRoute[role] : connectWalletButton()}
    </HomeContainer>
  );
}

export default Index;
