import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { serverUrl } from "../App";

const MyTasks = () => {
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    const getMyTasks = async () => {

        try {
            setLoading(true);

            const { data } = await axios.get(
                `${serverUrl}/api/task/my-tasks`,
                { withCredentials: true }
            );

            setTasks(data.tasks || []);
            setError("");

        } catch (error) {
            console.log(error);
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyTasks();
    }, []);

    const updateStatus = async (taskId, newStatus) => {

        const allowedStatus = ["todo", "inprogress", "completed"];
        if (!allowedStatus.includes(newStatus)) return;

        try {

            setUpdatingId(taskId);

            const { data } = await axios.put(
                `${serverUrl}/api/task/update-task/${taskId}`,
                { status: newStatus },
                { withCredentials: true }
            );

            // optimistic UI update
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId
                        ? { ...task, status: newStatus }
                        : task
                )
            );

        } catch (error) {
            console.log(error);
            setError("Failed to update task status");
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "inprogress":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-red-100 text-red-700";
        }
    };

    return (
        <div className="w-screen min-h-screen bg-slate-100">

            <Navbar />

            <div className="p-8">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">
                        My Tasks
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track and update your assigned tasks
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-5">
                        {error}
                    </div>
                )}

                {/* LOADING */}
                {loading ? (
                    <div className="text-center text-lg font-semibold text-indigo-600">
                        Loading...
                    </div>
                ) : tasks.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Tasks Found
                        </h2>
                        <p className="text-gray-500">
                            You don’t have any assigned tasks yet
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {tasks.map((task) => {

                            const isUpdating = updatingId === task._id;

                            return (
                                <div
                                    key={task._id}
                                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                                >

                                    {/* TITLE */}
                                    <div className="flex items-center justify-between mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {task.title}
                                        </h2>

                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>

                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="text-gray-500 text-sm mb-5">
                                        {task.description}
                                    </p>

                                    {/* INFO */}
                                    <div className="space-y-3">

                                        <div>
                                            <p className="text-sm text-gray-500">Project</p>
                                            <p className="font-semibold text-gray-700">
                                                {task.projectId?.projectName || "N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Priority</p>
                                            <p className="font-semibold text-gray-700 capitalize">
                                                {task.priority}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Deadline</p>
                                            <p className="font-semibold text-gray-700">
                                                {task.deadline
                                                    ? new Date(task.deadline).toLocaleDateString()
                                                    : "No Deadline"}
                                            </p>
                                        </div>

                                    </div>

                                {task.status !="completed"  && 
                                    <div className="mt-5">

                                        <label className="text-sm text-gray-500">
                                            Update Status
                                        </label>


                                        <select
                                            value={task.status}
                                            disabled={isUpdating}
                                            onChange={(e) =>
                                                updateStatus(task._id, e.target.value)
                                            }
                                            className="w-full mt-1 border rounded-lg p-2"
                                        >

                                            <option value="todo">Todo</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>

                                        </select>

                                        {isUpdating && (
                                            <p className="text-xs text-indigo-500 mt-1">
                                                Updating...
                                            </p>
                                        )}

                                    </div>
                        }

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyTasks;