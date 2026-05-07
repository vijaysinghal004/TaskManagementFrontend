import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const UserDeshboard = () => {

    const projects = useSelector((state) => state.user?.projects) || [];

    const getProgress = (project) => {
        const total = project?.totalTasks ?? 0;
        const completed = project?.completedTasks ?? 0;

        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return (
        <div className="w-screen min-h-screen bg-slate-100">
            <Navbar />

            <div className="p-8">

                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-indigo-600">
                        Member Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">
                        View your assigned projects and progress
                    </p>
                </div>

          
                {projects.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Projects Available
                        </h2>
                        <p className="text-gray-500">
                            Please wait for admin to assign projects
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {projects.map((project) => {

                            const progress = getProgress(project);

                            const total = project?.totalTasks ?? 0;
                            const completed = project?.completedTasks ?? 0;
                            const pending = Math.max(total - completed, 0);

                            return (
                                <div
                                    key={project._id}
                                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                                >

                                    {/* Title */}
                                    <div className="flex items-center justify-between mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {project?.projectName || "Untitled Project"}
                                        </h2>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                progress === 100
                                                    ? "bg-green-100 text-green-700"
                                                    : progress >= 50
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {progress}% Done
                                        </span>

                                    </div>

                                  
                                    <p className="text-gray-500 text-sm mb-5 line-clamp-3">
                                        {project?.description || "No description available"}
                                    </p>

                                  
                                    <div className="space-y-3 mb-5">

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <FaTasks className="text-indigo-600" />
                                            <span>
                                                Total Tasks: <strong>{total}</strong>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-700">
                                            <MdOutlinePendingActions className="text-orange-500" />
                                            <span>
                                                Pending Tasks: <strong>{pending}</strong>
                                            </span>
                                        </div>

                                    </div>

                                    
                                    <div className="mb-5">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-indigo-600 h-2 rounded-full"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>

                              
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Team Members
                                            </p>
                                            <p className="font-semibold text-gray-700">
                                                {project?.members?.length ?? 0}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Deadline
                                            </p>
                                            <p className="font-semibold text-gray-700">
                                                {project?.deadline
                                                    ? new Date(project.deadline).toLocaleDateString()
                                                    : "No Deadline"}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDeshboard;