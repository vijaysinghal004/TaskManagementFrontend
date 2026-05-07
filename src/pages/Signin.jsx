import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';

const Signin = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignin = async (e) => {

        e.preventDefault();

        try {

            const result = await axios.post(
                 `${serverUrl}/api/auth/signin`,
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(result.data.user));

            setErr("");

            navigate("/dashboard");

        } catch (err) {

            setErr(err?.response?.data?.message);

        }
    };

    const handleGoogleAuth = async () => {

        try {

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            const { data } = await axios.post(
                `${serverUrl}/api/auth/google-authlogin`,
                {
                    fullName: result.user.displayName,
                    email: result.user.email,
                },
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(data.user));

            setErr("");

            navigate("/dashboard");

        } catch (err) {

            setErr(err?.response?.data?.message);

        }
    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                <div className="mb-6 text-center">

                    <h1 className="text-3xl font-bold text-indigo-600">
                        TaskFlow
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage projects, teams & tasks efficiently
                    </p>

                </div>

                <form onSubmit={handleSignin}>

                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword
                                        ? <IoEyeOff />
                                        : <IoEye />
                                }
                            </button>

                        </div>

                    </div>

                    <div className="text-right mb-5">

                        <button
                            type="button"
                            className="text-indigo-600 text-sm hover:underline"
                            onClick={() => navigate("/forget-password")}
                        >
                            Forgot Password?
                        </button>

                    </div>

                    {
                        err && (
                            <p className="text-red-500 text-sm text-center mb-3">
                                {err}
                            </p>
                        )
                    }

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium"
                    >
                        Sign In
                    </button>

                    <div className="flex items-center my-5">

                        <div className="flex-1 border-t border-gray-300"></div>

                        <span className="px-3 text-gray-400 text-sm">
                            OR
                        </span>

                        <div className="flex-1 border-t border-gray-300"></div>

                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                    >
                        <FcGoogle size={22} />

                        Continue with Google

                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">

                    Don’t have an account?

                    <span
                        onClick={() => navigate("/signup")}
                        className="text-indigo-600 font-semibold cursor-pointer ml-1 hover:underline"
                    >
                        Sign Up
                    </span>

                </p>

            </div>

        </div>
    );
};

export default Signin;