import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from 'react-redux';

const CreateTask = () => {

    const navigate = useNavigate();

    const { projectId } = useParams();

    const members = useSelector(
        (state) => state.user.members
    ) || [];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [assignedTo, setAssignedTo] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateTask = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axios.post(
                `${serverUrl}/api/task/create-task`,
                {
                    title,
                    description,
                    priority,
                    assignedTo,
                    deadline,
                    projectId
                },
                {
                    withCredentials: true
                }
            );

            setSuccessMessage(data.message);

            setErrorMessage("");

            setTitle("");
            setDescription("");
            setPriority("medium");
            setAssignedTo("");
            setDeadline("");

            setTimeout(() => {

                navigate(`/project/${projectId}`);

            }, 1500);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message || "Failed to create task"
            );

            setSuccessMessage("");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className='w-screen min-h-screen bg-slate-100'>

            <Navbar />

            <div className='pt-[100px] flex justify-center px-4'>

                <div className='w-full max-w-2xl bg-white rounded-2xl shadow-md p-8'>

                    <h1 className='text-3xl font-bold text-indigo-600 mb-2'>
                        Create Task
                    </h1>

                    <p className='text-gray-500 mb-8'>
                        Assign task to members
                    </p>

                    {
                        successMessage && (
                            <div className='bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5 text-center'>
                                {successMessage}
                            </div>
                        )
                    }

                    {
                        errorMessage && (
                            <div className='bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5 text-center'>
                                {errorMessage}
                            </div>
                        )
                    }

                    <form
                        onSubmit={handleCreateTask}
                        className='space-y-5'
                    >

                        <div>

                            <label className='block mb-2 text-sm font-medium text-gray-700'>
                                Task Title
                            </label>

                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter task title'
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-600'
                                required
                            />

                        </div>

                        <div>

                            <label className='block mb-2 text-sm font-medium text-gray-700'>
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter task description'
                                rows={4}
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-600 resize-none'
                                required
                            ></textarea>

                        </div>

                        <div>

                            <label className='block mb-2 text-sm font-medium text-gray-700'>
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-600'
                            >

                                <option value="low">
                                    Low
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="high">
                                    High
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className='block mb-2 text-sm font-medium text-gray-700'>
                                Assign Member
                            </label>

                            <select
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-600'
                                required
                            >

                                <option value="">
                                    Select Member
                                </option>

                                {
                                    members.map((member) => (

                                        <option
                                            key={member._id}
                                            value={member._id}
                                        >
                                            {member.fullName}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>

                        <div>

                            <label className='block mb-2 text-sm font-medium text-gray-700'>
                                Deadline
                            </label>

                            <input
                                type='date'
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-600'
                                required
                            />

                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        >

                            {
                                loading ? (
                                    <>
                                        <AiOutlineLoading3Quarters className='animate-spin' />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Task"
                                )
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default CreateTask