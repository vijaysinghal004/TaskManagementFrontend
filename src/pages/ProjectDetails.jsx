import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { serverUrl } from "../App";

const ProjectDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingId, setLoadingId] = useState(null);

    const [message, setMessage] = useState({ type: "", text: "" });

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    // 🔄 LOAD DATA
    const getProjectDetails = async () => {
        try {

            const projectRes = await axios.get(
                `${serverUrl}/api/project/get-project/${id}`,
                { withCredentials: true }
            );

            setProject(projectRes.data.project);

            const taskRes = await axios.get(
                `${serverUrl}/api/task/get-tasks/${id}`,
                { withCredentials: true }
            );

            setTasks(taskRes.data.tasks);

        } catch (err) {
            showMessage("error", err.response?.data?.message || "Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    // 🔄 UPDATE STATUS (BLOCK IF COMPLETED)
    const handleStatusChange = async (taskId, status, currentStatus) => {

        if (currentStatus === "completed") {
            return showMessage("error", "Completed task cannot be updated");
        }

        try {

            setLoadingId(taskId);

            const res = await axios.put(
                `${serverUrl}/api/task/update-task/${taskId}`,
                { status },
                { withCredentials: true }
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, status } : task
                )
            );

            showMessage("success", res.data.message);

        } catch (err) {
            showMessage("error", err.response?.data?.message || "Update failed");
        } finally {
            setLoadingId(null);
        }
    };

    // 🗑️ DELETE TASK (BLOCK IF COMPLETED)
    const handleDeleteTask = async (taskId, currentStatus) => {

        if (currentStatus === "completed") {
            return showMessage("error", "Completed task cannot be deleted");
        }

        try {

            setLoadingId(taskId);

            await axios.delete(
                `${serverUrl}/api/task/${taskId}`,
                { withCredentials: true }
            );

            setTasks((prev) =>
                prev.filter((task) => task._id !== taskId)
            );

            showMessage("success", "Task deleted successfully");

        } catch (err) {
            showMessage("error", err.response?.data?.message || "Delete failed");
        } finally {
            setLoadingId(null);
        }
    };

    useEffect(() => {
        getProjectDetails();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="w-screen min-h-screen bg-slate-100">

            <Navbar />

            <div className="pt-[100px] p-8 max-w-6xl mx-auto">

                {/* MESSAGE UI */}
                {message.text && (
                    <div className={`mb-5 px-4 py-3 rounded-lg text-center font-medium ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* PROJECT HEADER */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

                    <div className="flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-indigo-600">
                                {project?.projectName}
                            </h1>
                            <p className="text-gray-500 mt-2">
                                {project?.description}
                            </p>
                        </div>

                        {userData?.role === "admin" && (
                            <button
                                onClick={() => navigate(`/create-task/${id}`)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-md"
                            >
                                + Create Task
                            </button>
                        )}

                    </div>

                </div>

                {/* TASKS GRID */}
                {
                    tasks.length === 0 ? (

                        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                No Tasks Found
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Create tasks to start managing your project
                            </p>
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {tasks.map((task) => {

        const isCompleted = task.status === "completed";
        const isLoading = loadingId === task._id;

        return (

            <div
                key={task._id}
                className={`transition ${isCompleted ? "opacity-70" : ""}`}
            >

                <TaskCard
                    task={task}
                    isUpdating={isLoading}
                    onStatusChange={(taskId, status) =>
                        handleStatusChange(taskId, status, task.status)
                    }
                />

                {/* OWNER ACTIONS */}
                {userData?.role === "admin" && (

                    <div className="flex gap-2 mt-3">

                        <button
                            disabled={isLoading || isCompleted}
                            onClick={() =>
                                handleDeleteTask(task._id, task.status)
                            }
                            className={`w-full py-2 rounded-lg text-white font-medium transition ${
                                isCompleted
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                            }`}
                        >
                            Delete
                        </button>

                    </div>

                )}

            </div>

        );
    })}

</div>

                    )
                }

            </div>

        </div>
    );
};

export default ProjectDetails;