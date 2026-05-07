import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { serverUrl } from "../App";

const EditProject = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [message, setMessage] = useState({ type: "", text: "" });

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    // 🔄 LOAD PROJECT DATA
    const getProject = async () => {
        try {

            const res = await axios.get(
                `${serverUrl}/api/project/get-project/${id}`,
                { withCredentials: true }
            );

            const project = res.data.project;

            setProjectName(project.projectName);
            setDescription(project.description);
            setDeadline(
                project.deadline
                    ? project.deadline.split("T")[0]
                    : ""
            );

        } catch (error) {
            showMessage("error", "Failed to load project");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getProject();
    }, []);

    // 🔄 UPDATE PROJECT
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.put(
                `${serverUrl}/api/project/update-project/${id}`,
                {
                    projectName,
                    description,
                    deadline
                },
                { withCredentials: true }
            );

            showMessage("success", res.data.message);

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (error) {

            showMessage(
                "error",
                error.response?.data?.message || "Update failed"
            );

        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <AiOutlineLoading3Quarters className="animate-spin text-3xl text-indigo-600" />
            </div>
        );
    }

    return (

        <div className="w-screen min-h-screen bg-slate-100">

            <Navbar />

            <div className="pt-[110px] flex items-center justify-center px-4">

                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">

                    {/* HEADER */}
                    <h1 className="text-3xl font-bold text-indigo-600 mb-2">
                        Edit Project
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Update project details and manage workflow
                    </p>

                    {/* MESSAGE */}
                    {message.text && (
                        <div className={`px-4 py-3 rounded-lg mb-5 text-center font-medium ${
                            message.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {message.text}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleUpdate} className="space-y-5">

                        {/* PROJECT NAME */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                        </div>

                        {/* DEADLINE */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Project"
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditProject;