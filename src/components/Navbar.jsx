import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className=" border border-gray-200 h-auto">
      <h1
        className="text-3xl font-bold p-7 h-full cursor-pointer"
        onClick={handleLogoClick}
      >
        MobileStore
      </h1>
    </div>
  );
}

export default Navbar;
