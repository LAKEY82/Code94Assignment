import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Home2, TaskSquare, Diagram, LampCharge, NotificationBing, Setting2 } from 'iconsax-react'; 

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
        {["Home", "Tasks", "Report", "Insights", "Inbox", "Settings"].map((item) => (
          <li
            key={item}
            className={`p-3 rounded cursor-pointer ${
              active === item
                ? "bg-[#0359E0] text-white"
                : "hover:bg-[#F6F6F6] hover:text-black"
            } flex items-center space-x-3`}
            onClick={() => handleClick(item)}
          >
            {/*Items icons add */}
            {item === "Home" && <Home2 size={24} color={active === item ? "white" : "#555"} />}
            {item === "Tasks" && <TaskSquare size={24} color={active === item ? "white" : "#555"} />}
            {item === "Report" && <Diagram size={24} color={active === item ? "white" : "#555"} />}
            {item === "Insights" && <LampCharge size={24} color={active === item ? "white" : "#555"} />}
            {item === "Inbox" && <NotificationBing size={24} color={active === item ? "white" : "#555"} />}
            {item === "Settings" && <Setting2 size={24} color={active === item ? "white" : "#555"} />}

            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
