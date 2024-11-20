import React, { useState } from 'react';
import { SearchNormal1,HambergerMenu } from 'iconsax-react';
import logo from '../assets/img.png';
const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar (Full width) */}
      <div className="w-full flex items-center justify-between bg-white p-[19px] border-b">

        {/* Search Bar */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 w-96">
          <SearchNormal1 className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks"
            className="bg-white outline-none w-full text-black"
          />
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-full p-2 flex items-center">
  <HambergerMenu size="32" color="#555555" />
  <img src={logo} alt="Code94 Labs Logo" className="w-8 h-8 ml-4" />
</div>


      </div>

      {/* Main Content Section (Below Top Bar) */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Content for Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>
          {/* You can add your task-related content here */}
          {/* This is just a placeholder */}
          <div className="bg-red-500 p-6">
            {/* Tasks content */}
            Task List
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
