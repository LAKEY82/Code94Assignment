import React, { useState } from 'react';
import { SearchNormal1, HambergerMenu,RecordCircle } from 'iconsax-react';
import logo from '../assets/img.png';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar (Full width) */}
      <div className="w-full flex items-center justify-between bg-white p-[14.5px] border-b">

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

        {/* Logo and Hamburger Menu */}
        <div className="bg-white border-2 border-gray-100 rounded-full p-2 flex items-center">
          <HambergerMenu size="32" color="#555555" />
          <img src={logo} alt="Code94 Labs Logo" className="w-8 h-8 ml-4" />
        </div>
      </div>

      {/* Main Content Section (Below Top Bar) */}
      <div className="flex flex-1 bg-[#F6F6F6] p-6 space-x-6">
        {/* Todo Column */}
        <div className="bg-[#F6F6F6] rounded-lg border-dashed border-2 border-gray-300 w-1/3 p-4">
          <div className="flex items-center bg-white h-[50px] rounded-lg gap-x-[10px]">
          <RecordCircle className='pl-5' size="42" color="#ffad0d" variant="Bold"/>
            <span className="text-black font-bold">Todo</span>
            <span className="text-blue-500 pr-7">0</span>
          </div>
          <button className="w-full text-center text-gray-500 mt-4 py-2">+ Add task</button>
        </div>

        {/* In Progress Column */}
        <div className="bg-[#F6F6F6] rounded-lg border-dashed border-2 border-gray-300 shadow-md w-1/3 p-4">
          <div className="flex items-center bg-white h-[50px] rounded-lg gap-x-[10px]">
          <RecordCircle className='pl-5' size="42" color="#0C6FBF" variant="Bold"/>
            <span className="text-black font-bold">In Progress</span>
            <span className="text-blue-500 pr-7">0</span>
          </div>
          <button className="w-full text-center text-gray-500 mt-4 ">+ Add task</button>
        </div>

        {/* Completed Column */}
        <div className="bg-[#F6F6F6] border-dashed border-2 border-gray-300 rounded-lg shadow-md w-1/3 p-4">
          <div className="flex items-center bg-white h-[50px] rounded-lg gap-x-[10px]">
          <RecordCircle className='pl-5' size="42" color="#2A7E2E" variant="Bold"/>
            <span className="text-black font-bold">Completed</span>
            <span className="text-blue-500 pr-7">0</span>
          </div>
          <button className="w-full text-center text-gray-500 mt-4 ">+ Add task</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
