import React, { useEffect } from "react";
import { getRole, useHealth } from "../../context/health";
import useCheckWallet from "../../hooks/useCheckWallet";
import Header from "./Header";
import "./index.css";

const Index = ({ children }) => {
  const [currentAccount, connectWalletHandler] = useCheckWallet();
  const { dispatch } = useHealth();

  const getRoleContract = async () =>
    currentAccount && dispatch({ ...(await getRole(currentAccount)) });

  useEffect(() => {
    getRoleContract();
  }, [currentAccount]);

  return (
    <>
      <Header />
      <div className="home-container">{children}</div>
    </>
  );
};

export default Index;
