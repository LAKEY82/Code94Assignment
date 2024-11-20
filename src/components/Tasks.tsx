import React, { useState } from 'react';
import { SearchNormal1, HambergerMenu, RecordCircle, Add, Calendar } from 'iconsax-react';
import logo from '../assets/img.png';
import user1Image from '../assets/user.png'; // Replace with your actual image path
import user2Image from '../assets/lp.jpeg'; // Replace with your actual image path
import TaskDetails from '../components/TaskDetails'

interface Task {
    id: number;
    name: string;
    date: string;
    priority: string;
    user: string;
    status: 'todo' | 'inProgress' | 'completed'; // Added status field
    description: string; // Added description field
}


interface TaskState {
    todo: Task[];
    inProgress: Task[];
    completed: Task[];
}

const Tasks: React.FC = () => {
    // State for tasks in each column
    const [tasks, setTasks] = useState<TaskState>({
        todo: [],
        inProgress: [],
        completed: [],
    });

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDateSelected, setIsDateSelected] = useState<boolean>(false);  // New state to track date selection
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State for dropdown visibility
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleCheckboxClick = (task: Task) => {
        setSelectedTask(task); // Open the details panel with the selected task
    };

    const handleCloseDetails = () => {
        setSelectedTask(null); // Close the details panel
    };

    const deleteTask = (column: keyof TaskState, id: number) => {
        setTasks((prev) => ({
            ...prev,
            [column]: prev[column].filter((task) => task.id !== id),  // **Deletes the task by filtering it out**
        }));
    };


    // Add a new task card
    const handleAddTask = (column: keyof TaskState) => {
        setTasks((prev) => ({
            ...prev,
            [column]: [
                ...prev[column],
                { 
                    id: Date.now(), 
                    name: '', 
                    date: new Date().toISOString().split('T')[0], // Set current date as default
                    priority: '', 
                    user: 'user1' 
                },
            ],
        }));
    };

    const handleTaskChange = (
        column: keyof TaskState,
        id: number,
        field: keyof Task,
        value: string
    ) => {
        setTasks((prev) => ({
            ...prev,
            [column]: prev[column].map((task) =>
                task.id === id ? { ...task, [field]: value } : task
            ),
        }));
    };

    // Format the date as month and day
    const formatDate = (date: string) => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const renderTaskCard = (column: keyof TaskState, task: Task) => (
        <div key={task.id} className="bg-white p-4 rounded-lg mt-4 shadow-md">
            {/* Task Name Input */}
            <div className="flex items-center">
            <input
    type="checkbox"
    className="w-5 h-5 mr-3 rounded-full appearance-none border-2 border-gray-400 checked:bg-blue-500 checked:border-blue-500"
    onClick={() => handleCheckboxClick(task)} // Show task details on click
/>

                <input
                    type="text"
                    placeholder="Write a task name"
                    value={task.name}
                    onChange={(e) =>
                        handleTaskChange(column, task.id, 'name', e.target.value)
                    }
                    className="flex-1 border-none outline-none bg-transparent text-black"
                />
            </div>
            {selectedTask && (
    <TaskDetails
    task={selectedTask}
    onClose={handleCloseDetails}
    handleTaskChange={handleTaskChange}
    column={column}
    deleteTask={deleteTask}  // **Passing deleteTask prop**
/>
)}


            {/* Dropdowns and Calendar */}
            <div className="flex justify-between items-center mt-4">
                {/* Profile Dropdown with User Image */}
                <div className="relative border border-dashed border-gray-300 rounded-full p-2 bg-white flex items-center">
                    <div className="cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="flex items-center gap-x-2">
                            <img
                                src={task.user === 'user1' ? user1Image : user2Image} // Based on task user
                                alt="User"
                                className="w-6 h-6 rounded-full"
                            />
                            {task.user && (
                                <span className="ml-2 text-gray-700">
                                    {task.user === 'user1' ? 'User 1' : 'User 2'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Dropdown List, hidden by default */}
                    {isDropdownOpen && (
                        <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-full">
                            <div
                                className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-x-2"
                                onClick={() => {
                                    handleTaskChange(column, task.id, 'user', 'user1');
                                    setIsDropdownOpen(false); // Close the dropdown after selection
                                }}
                            >
                                <img
                                    src={user1Image}
                                    alt="User 1"
                                    className="w-6 h-6 rounded-full"
                                />
                                <span>User 1</span>
                            </div>
                            <div
                                className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-x-2"
                                onClick={() => {
                                    handleTaskChange(column, task.id, 'user', 'user2');
                                    setIsDropdownOpen(false); // Close the dropdown after selection
                                }}
                            >
                                <img
                                    src={user2Image}
                                    alt="User 2"
                                    className="w-6 h-6 rounded-full"
                                />
                                <span>User 2</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Calendar Icon and Date */}
                <div className="relative border border-dashed border-gray-300 rounded-full p-2 bg-white flex items-center justify-center">
                    {isDateSelected ? (
                        // Display formatted date
                        <span
                            className="text-gray-700 text-sm font-semibold cursor-pointer"
                            onClick={() => setIsDateSelected(false)} // Allow clicking the date to make it editable
                        >
                            {formatDate(task.date)}
                        </span>
                    ) : (
                        <>
                            {/* Date Input with Calendar */}
                            <input
                                type="date"
                                value={task.date}
                                onChange={(e) => {
                                    handleTaskChange(column, task.id, 'date', e.target.value);
                                    setIsDateSelected(true); // Set the date as selected when user selects a date
                                }}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <Calendar size="32" color="#555555" />
                        </>
                    )}
                </div>

                {/* Priority Dropdown */}
                <select
                    value={task.priority}
                    onChange={(e) => handleTaskChange(column, task.id, 'priority', e.target.value)}
                    className={`border border-gray-300 rounded-lg p-2 text-gray-700 
                        ${task.priority === 'low' ? 'text-blue-500' : task.priority === 'medium' ? 'text-yellow-500' : task.priority === 'high' ? 'text-red-500' : ''}`}
                >
                    <option value="">Set priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between bg-white p-[14.5px] border-b">
                {/* Search Bar */}
                <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 w-96">
                    <SearchNormal1 className="text-gray-500 w-5 h-5 mr-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Main Content Section */}
            <div className="flex flex-1 bg-[#F6F6F6] p-6 space-x-6">
                {/* Todo Column */}
                <div className="bg-[#F6F6F6] rounded-lg border-dashed border-2 border-gray-300 w-1/3 p-4">
                    <div className="flex items-center bg-white h-[50px] rounded-lg justify-between gap-x-[10px]">
                        <div className="flex items-center gap-x-5">
                            <RecordCircle className="pl-5" size="42" color="#ffad0d" variant="Bold" />
                            <span className="text-black font-bold">Todo</span>
                            <span className="text-blue-500 pl-2 pr-2 bg-[#F2F6FD] rounded-full">
                                {tasks.todo.length}
                            </span>
                        </div>
                        <Add
                            className="mr-2 cursor-pointer"
                            size="32"
                            color="#555555"
                            onClick={() => handleAddTask('todo')}
                        />
                    </div>
                    <div className="mt-6">
                        {tasks.todo.map((task) => renderTaskCard('todo', task))}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="bg-[#F6F6F6] rounded-lg border-dashed border-2 border-gray-300 w-1/3 p-4">
                    <div className="flex items-center bg-white h-[50px] rounded-lg justify-between gap-x-[10px]">
                        <div className="flex items-center gap-x-5">
                            <RecordCircle className="pl-5" size="42" color="#ffa500" variant="Bold" />
                            <span className="text-black font-bold">In Progress</span>
                            <span className="text-blue-500 pl-2 pr-2 bg-[#F2F6FD] rounded-full">
                                {tasks.inProgress.length}
                            </span>
                        </div>
                        <Add
                            className="mr-2 cursor-pointer"
                            size="32"
                            color="#555555"
                            onClick={() => handleAddTask('inProgress')}
                        />
                    </div>
                    <div className="mt-6">
                        {tasks.inProgress.map((task) => renderTaskCard('inProgress', task))}
                    </div>
                </div>

                {/* Completed Column */}
                <div className="bg-[#F6F6F6] rounded-lg border-dashed border-2 border-gray-300 w-1/3 p-4">
                    <div className="flex items-center bg-white h-[50px] rounded-lg justify-between gap-x-[10px]">
                        <div className="flex items-center gap-x-5">
                            <RecordCircle className="pl-5" size="42" color="#006400" variant="Bold" />
                            <span className="text-black font-bold">Completed</span>
                            <span className="text-blue-500 pl-2 pr-2 bg-[#F2F6FD] rounded-full">
                                {tasks.completed.length}
                            </span>
                        </div>
                        <Add
                            className="mr-2 cursor-pointer"
                            size="32"
                            color="#555555"
                            onClick={() => handleAddTask('completed')}
                        />
                    </div>
                    <div className="mt-6">
                        {tasks.completed.map((task) => renderTaskCard('completed', task))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
