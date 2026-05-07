import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { serverUrl } from "../App";

const CreateProject = () => {

    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateProject = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(
                `${serverUrl}/api/project/create-project`,
                {
                    projectName,
                    description,
                    deadline
                },
                {
                    withCredentials: true
                }
            );

            setSuccessMessage(res.data.message);

            setErrorMessage("");

            setProjectName("");
            setDescription("");
            setDeadline("");

            setTimeout(() => {

                navigate("/");

            }, 1500);

        } catch (err) {

            setErrorMessage(
                err.response?.data?.message || "Something went wrong"
            );

            setSuccessMessage("");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="w-screen min-h-screen bg-slate-100">

            <Navbar />

            <div className="pt-[110px] flex items-center justify-center px-4">

                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">

                    <h1 className="text-3xl font-bold text-indigo-600 mb-2">
                        Create Project
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Add a new project and manage tasks efficiently
                    </p>

                    {
                        successMessage && (

                            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5 text-center">
                                {successMessage}
                            </div>

                        )
                    }

                    {
                        errorMessage && (

                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5 text-center">
                                {errorMessage}
                            </div>

                        )
                    }

                    <form
                        onSubmit={handleCreateProject}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-gray-700 font-medium mb-2">
                                Project Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter project name"
                                value={projectName}
                                onChange={(e) =>
                                    setProjectName(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                rows={5}
                                placeholder="Enter project description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            ></textarea>

                        </div>

                        <div>

                            <label className="block text-gray-700 font-medium mb-2">
                                Deadline
                            </label>

                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) =>
                                    setDeadline(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <button
                            type="submit"
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
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Project"
                                )
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateProject;