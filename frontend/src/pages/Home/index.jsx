import React, { useEffect, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import { assignContract } from "../../contractEther/assign";
import { ethers } from "ethers";
import { getRole, useHealth } from "../../context/health";
import useCheckWallet from "../../hooks/useCheckWallet";

import { Navigate } from "react-router-dom";

function Index() {
  const [currentAccount, connectWalletHandler] = useCheckWallet();
  const { type, address, role, dispatch } = useHealth();

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const getRoleContract = async () =>
    currentAccount && dispatch({ ...(await getRole(currentAccount)) });

  useEffect(() => {
    getRoleContract();
  }, [currentAccount]);

  const renderRoute = {
    0: <Navigate to={"/admin"} />,
    1: <Navigate to={"/doctor"} />,
    2: <Navigate to={"/patient"} />,
    [-1]: <div>Error</div>,
  };

  return (
    <HomeContainer>
      {currentAccount ? renderRoute[role] : connectWalletButton()}
    </HomeContainer>
  );
}

export default Index;
