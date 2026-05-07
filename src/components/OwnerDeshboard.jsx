import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import { serverUrl } from '../App'
import { setProjects } from '../redux/userSlice'
import { AiOutlineLoading3Quarters, AiFillEdit, AiFillDelete } from "react-icons/ai";

const OwnerDeshboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector((state) => state.user?.projects) || [];

    const [loadingId, setLoadingId] = useState(null);

    const getProjects = async () => {
        try {
            const { data } = await axios.get(
                `${serverUrl}/api/project/get-projects`,
                { withCredentials: true }
            );

            dispatch(setProjects(data.projects));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    // DELETE PROJECT
    const handleDelete = async (id, e) => {
        e.stopPropagation();

        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            setLoadingId(id);

            await axios.delete(
                `${serverUrl}/api/project/delete-project/${id}`,
                { withCredentials: true }
            );

            dispatch(setProjects(
                projects.filter((p) => p._id !== id)
            ));

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId(null);
        }
    };

    // EDIT PROJECT
    const handleEdit = (id, e) => {
        e.stopPropagation();
        navigate(`/edit-project/${id}`);
    };

    return (

        <div className='w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-200'>

            <Navbar />

            <div className='p-8 max-w-7xl mx-auto'>

                {/* HEADER */}
                <div className='flex items-center justify-between mb-10'>

                    <div>
                        <h1 className='text-4xl font-bold text-indigo-600'>
                            Project Dashboard
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            Manage your projects efficiently
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/create-project')}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md'
                    >
                        + New Project
                    </button>

                </div>

                {/* EMPTY STATE */}
                {
                    projects.length === 0 ? (

                        <div className='bg-white rounded-2xl shadow p-10 text-center'>
                            <h2 className='text-2xl font-semibold text-gray-700'>
                                No Projects Yet
                            </h2>
                            <p className='text-gray-500 mt-2'>
                                Create your first project to get started
                            </p>
                        </div>

                    ) : (

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                            {
                                projects.map((project) => {

                                    const progress =
                                        project.totalTasks > 0
                                            ? Math.round(
                                                (project.completedTasks / project.totalTasks) * 100
                                            )
                                            : 0;

                                    const isLoading = loadingId === project._id;

                                    return (

                                        <div
                                            key={project._id}
                                            onClick={() => navigate(`/project/${project._id}`)}
                                            className='group bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-2xl transition-all relative'
                                        >

                                            {/* TOP SECTION */}
                                            <div className='flex justify-between items-start'>

                                                <h2 className='text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition'>
                                                    {project.projectName}
                                                </h2>

                                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                    progress === 100
                                                        ? "bg-green-100 text-green-700"
                                                        : progress >= 50
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}>
                                                    {progress}%
                                                </span>

                                            </div>

                                            {/* DESCRIPTION */}
                                            <p className='text-gray-500 text-sm mt-3 line-clamp-3'>
                                                {project.description}
                                            </p>

                                            {/* PROGRESS BAR */}
                                            <div className='mt-5'>
                                                <div className='w-full bg-gray-200 rounded-full h-2'>
                                                    <div
                                                        className='bg-indigo-600 h-2 rounded-full transition-all'
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* META */}
                                            <div className='flex justify-between mt-5 text-sm text-gray-600'>

                                                <span>
                                                    👥 {project.members?.length || 0} members
                                                </span>

                                                <span>
                                                    📅 {project.deadline
                                                        ? new Date(project.deadline).toLocaleDateString()
                                                        : "No deadline"}
                                                </span>

                                            </div>


                                            <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition'>

                                          
                                                <button
                                                    onClick={(e) => handleEdit(project._id, e)}
                                                    className='p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow'
                                                >
                                                    <AiFillEdit size={18} />
                                                </button>

                                                {/* DELETE */}
                                                <button
                                                    onClick={(e) => handleDelete(project._id, e)}
                                                    disabled={isLoading}
                                                    className='p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow flex items-center justify-center'
                                                >
                                                    {isLoading ? (
                                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                                    ) : (
                                                        <AiFillDelete size={18} />
                                                    )}
                                                </button>

                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    )
                }

            </div>

        </div>
    )
}

export default OwnerDeshboard