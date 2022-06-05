import React, { useEffect } from "react";
import { getRole, useHealth } from "../../context/health";
import useCheckWallet from "../../hooks/useCheckWallet";
import Header from "./Header";
import "./index.css";
import Loader from "../../components/Loader";
import SideNav from "../SideNav";

const Index = ({ children }) => {
  const [currentAccount, connectWalletHandler] = useCheckWallet();
  const { loading, dispatch } = useHealth();

  const getRoleContract = async () =>
    currentAccount && dispatch({ ...(await getRole(currentAccount)) });

  useEffect(() => {
    getRoleContract();
  }, [currentAccount]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="home-container">
        <SideNav />
        <div className="container"> {children}</div>
      </div>
    </>
  );
};

export default Index;
