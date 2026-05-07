import React, { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from '../App'
import { setUserData } from "../redux/userSlice";

function Navbar() {

    const { userData } = useSelector((state) => state.user);

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async () => {

        try {

            await axios.get(
                `${serverUrl}/api/auth/signOut`,
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(null));

            navigate("/signin");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <nav className="w-full h-[70px] bg-white shadow-md fixed top-0 z-50 flex items-center justify-between px-8">

            <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
            >

                <FaTasks className="text-indigo-600 text-2xl" />

                <h1 className="text-2xl font-bold text-indigo-600">
                    TaskFlow
                </h1>

            </div>

            <div className="flex items-center gap-6">

                {
                    userData?.role === "admin" && (
                        <>

                            <button
                                onClick={() => navigate("/create-project")}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                Create Project
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                Manage Projects
                            </button>

                        </>
                    )
                }

                {
                    userData?.role === "member" && (
                        <>

                            <button
                                onClick={() => navigate("/")}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                Projects
                            </button>

                            <button
                                onClick={() => navigate("/my-tasks")}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                My Tasks
                            </button>

                        </>
                    )
                }

                <div className="relative">

                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-[40px] h-[40px] rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer text-lg font-semibold uppercase"
                    >
                        {userData?.fullName?.charAt(0)}
                    </div>

                    {
                        showMenu && (

                            <div className="absolute right-0 mt-3 w-[190px] bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4">

                                <div className="flex items-center gap-3 border-b pb-3">

                                    <div className="w-[38px] h-[38px] rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold uppercase">
                                        {userData?.fullName?.charAt(0)}
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {userData?.fullName}
                                        </p>

                                        <p className="text-xs text-gray-500 capitalize">
                                            {userData?.role}
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition text-sm"
                                >

                                    <FiUser />

                                    Profile

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition text-sm"
                                >

                                    <FiLogOut />

                                    Logout

                                </button>

                            </div>

                        )
                    }

                </div>

            </div>

        </nav>
    );
}

export default Navbar;