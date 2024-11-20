import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navigation: React.FC = () => {
  const [active, setActive] = useState<string>("Home");

  const handleClick = (item: string) => {
    setActive(item);
  };

  return (
    <div className="w-64 bg-white text-white flex flex-col h-screen">
      {/* Logo / Title */}
      <div className="flex items-center p-6 text-lg font-bold border-b border-[#EFEFEF] w-full text-black">
        <img src={logo} alt="Code94 Labs Logo" className="w-8 h-8 mr-4" />
        Code94 Labs
      </div>

      {/* Navigation Items */}
      <ul className="flex flex-col space-y-4 mt-6 px-4 text-black">
        {["Home", "Tasks", "Report", "Insights"].map((item) => (
          <li
            key={item}
            className={`p-3 rounded cursor-pointer ${
              active === item
                ? "bg-[#0359E0] text-white"
                : "hover:bg-[#F6F6F6] hover:text-black"
            }`}
            onClick={() => handleClick(item)}
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
