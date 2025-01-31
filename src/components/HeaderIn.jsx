import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderIn = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/")}>CROWDFUNDING</h1>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/fundraise")}>Fundraise For</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderIn;
