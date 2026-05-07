import React from "react";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProjectCard = ({
    project,
    isAdmin = false,
    onClick,
    onJoin,
    loadingId
}) => {

    const progress =
        project.totalTasks > 0
            ? Math.round(
                (project.completedTasks / project.totalTasks) * 100
            )
            : 0;

    return (

        <div
            onClick={isAdmin ? onClick : undefined}
            className={`bg-white rounded-2xl shadow-md p-6 transition hover:shadow-xl ${
                isAdmin ? "cursor-pointer" : ""
            }`}
        >

            <div className='flex items-center justify-between mb-4'>

                <h2 className='text-xl font-semibold text-gray-800'>
                    {project.projectName}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        progress === 100
                            ? 'bg-green-100 text-green-700'
                            : progress >= 50
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {progress}% Done
                </span>

            </div>

            <p className='text-gray-500 text-sm mb-5 line-clamp-3'>
                {project.description}
            </p>

            <div className='space-y-3 mb-5'>

                <div className='flex items-center gap-3 text-gray-700'>

                    <FaTasks className='text-indigo-600' />

                    <span>
                        Total Tasks :
                        {" "}
                        <strong>
                            {project.totalTasks || 0}
                        </strong>
                    </span>

                </div>

                <div className='flex items-center gap-3 text-gray-700'>

                    <MdOutlinePendingActions className='text-orange-500' />

                    <span>
                        Pending Tasks :
                        {" "}
                        <strong>
                            {
                                (project.totalTasks || 0) -
                                (project.completedTasks || 0)
                            }
                        </strong>
                    </span>

                </div>

            </div>

            <div className='mb-5'>

                <div className='w-full bg-gray-200 rounded-full h-2'>

                    <div
                        className='bg-indigo-600 h-2 rounded-full'
                        style={{ width: `${progress}%` }}
                    ></div>

                </div>

            </div>

            <div className='flex items-center justify-between mb-5'>

                <div>

                    <p className='text-sm text-gray-500'>
                        Team Members
                    </p>

                    <p className='font-semibold text-gray-700'>
                        {project.members?.length || 0}
                    </p>

                </div>

                <div>

                    <p className='text-sm text-gray-500'>
                        Deadline
                    </p>

                    <p className='font-semibold text-gray-700'>
                        {
                            project.deadline
                                ? new Date(project.deadline).toLocaleDateString()
                                : "No Deadline"
                        }
                    </p>

                </div>

            </div>

            {
                !isAdmin && (
                    <button
                        onClick={() => onJoin(project._id)}
                        disabled={loadingId === project._id}
                        className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition ${
                            loadingId === project._id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >

                        {
                            loadingId === project._id ? (
                                <>
                                    <AiOutlineLoading3Quarters className='animate-spin' />
                                    Joining...
                                </>
                            ) : (
                                "Join Project"
                            )
                        }

                    </button>
                )
            }

        </div>
    );
};

export default ProjectCard;