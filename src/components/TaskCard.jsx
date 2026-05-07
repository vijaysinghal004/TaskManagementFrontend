import React, { useState } from "react";
import { FaUser, FaFlag, FaTrash } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";

const TaskCard = ({
    task = {},
    onRefresh,
    isOwner = false
}) => {

    const [loading, setLoading] = useState(false);

    const status = task?.status || "todo";

    const statusColor =
        status === "completed"
            ? "bg-green-100 text-green-700"
            : status === "inprogress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700";

    const priorityColor =
        task?.priority === "high"
            ? "text-red-600"
            : task?.priority === "medium"
            ? "text-yellow-600"
            : "text-green-600";

    // ✅ UPDATE STATUS
    const handleStatusChange = async (newStatus) => {
        try {
            setLoading(true);

            await axios.put(
                `${serverUrl}/api/task/update-task/${task._id}`,
                { status: newStatus },
                { withCredentials: true }
            );

            onRefresh && onRefresh();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE TASK (OWNER ONLY)
    const handleDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(
                `${serverUrl}/api/task/${task._id}`,
                { withCredentials: true }
            );

            onRefresh && onRefresh();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ REASSIGN TASK (OWNER ONLY)
    const handleReassign = async () => {
        const newUserId = prompt("Enter new user ID:");

        if (!newUserId) return;

        try {
            setLoading(true);

            await axios.put(
                `${serverUrl}/api/task/reassign/${task._id}`,
                { assignedTo: newUserId },
                { withCredentials: true }
            );

            onRefresh && onRefresh();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">

                <h3 className="text-lg font-semibold text-gray-800">
                    {task?.title || "Untitled Task"}
                </h3>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {status}
                </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mb-4">
                {task?.description || "No description available"}
            </p>

            {/* INFO */}
            <div className="space-y-2 text-sm text-gray-700 mb-4">

                <div className="flex items-center gap-2">
                    <FaUser className="text-indigo-600" />
                    <span>
                        Assigned To:{" "}
                        <strong>
                            {task?.assignedTo?.fullName || "Unassigned"}
                        </strong>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <FaFlag className={priorityColor} />
                    <span>
                        Priority:{" "}
                        <strong className={priorityColor}>
                            {task?.priority || "low"}
                        </strong>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <MdOutlineDateRange className="text-indigo-500" />
                    <span>
                        Deadline:{" "}
                        <strong>
                            {task?.deadline
                                ? new Date(task.deadline).toLocaleDateString()
                                : "No deadline"}
                        </strong>
                    </span>
                </div>

            </div>

            {/* ================= OWNER ACTIONS ================= */}
            {isOwner && (

                <div className="space-y-2">

                    {/* STATUS CHANGE */}
                    <select
                        value={status}
                        disabled={loading}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="todo">Todo</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* REASSIGN */}
                    <button
                        onClick={handleReassign}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Reassign Task
                    </button>

                    {/* DELETE */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                        <FaTrash />
                        Delete Task
                    </button>

                </div>

            )}

        </div>
    );
};

export default TaskCard;