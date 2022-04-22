import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useHealth } from "../../context/health";

function Header() {
  const { type, _id, role } = useHealth();

  return (
    <header>
      <img src={logo} className="logo" alt="logo" />
      <div className="right">
        <h3>Welcome : {_id}</h3>
        <h4>Role : {type}</h4>
      </div>
    </header>
  );
}

export default Header;
