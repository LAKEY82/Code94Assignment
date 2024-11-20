import { ArrowRight, Trash,Calendar, User, Flag } from 'iconsax-react';
import React from 'react';

interface Task {
    id: number;
    name: string;
    date: string;
    priority: string;
    user: string;
}

interface TaskDetailsProps {
    task: Task | null;
    onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 z-50 transition-transform transform translate-x-0">
            {/* Header Section */}
            <div className="flex items-center justify-between w-full mb-4"> {/* Margin bottom added */}
                {/* Left-Aligned Button */}
                <button className="flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100">
                    <span className="mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                            />
                        </svg>
                    </span>
                    Mark Complete
                </button>

                {/* Right-Aligned Icons */}
                <div className="flex items-center gap-4">
                    <Trash size="32" color="#555555" />
                    <ArrowRight
                        onClick={onClose}
                        size="32"
                        color="#555555"
                        className="cursor-pointer"
                    />
                </div>
            </div>

            {/* Task Name */}
            <h2 className="text-xl font-bold mb-4 p-4 border rounded-lg text-center mt-[60px] bg-white">
                {task.name || 'Task Details'}
            </h2>

            {/* Task Details Section */}
            <div className="pt-6">
                {/* Due Date */}
                <div className="mb-4 flex items-center gap-x-[10px]">
                <Calendar size="18" color="#555555"/>
    <p className="text-sm text-gray-500 mr-2 ]">Due Date</p>
    <p className="text-lg font-semibold text-blue-700 ml-[70px]">
        {new Date(task.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}
    </p>
</div>


                 {/* Assigned User */}
                 <div className='mb-4 flex items-center gap-x-[10px]' >
                 <User size="16" color="#555555"/>
                    <p className="text-sm text-gray-500 ">Assigned User</p>
                    <p className="text-lg font-semibold ml-[54px]">
                        {task.user === 'user1' ? 'User 1' : 'User 2'}
                    </p>
                </div>

                {/* Priority */}
                <div className="mb-4 flex items-center gap-x-[10px]">
                <Flag size="22" color="#555555"/>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className="text-lg font-semibold ml-[88px]">
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </p>
                </div>

               
            </div>
        </div>
    );
};

export default TaskDetails;
