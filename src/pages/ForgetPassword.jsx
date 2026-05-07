import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import { serverUrl } from '../App';

const ForgetPassword = () => {

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);

    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const handleSendOtp = async () => {

        if (!email) {
            setErr("Email is required");
            return;
        }

        try {

            setIsLoading1(true);

            await axios.post(
                `${serverUrl}/api/auth/send-otp`,
                {
                    email
                },
                {
                    withCredentials: true
                }
            );

            setErr("");

            setStep(2);

        } catch (err) {

            setErr(err?.response?.data?.message);

        } finally {

            setIsLoading1(false);

        }
    };

    const handleVerifyOtp = async () => {

        try {

            setIsLoading2(true);

            await axios.post(
               `${serverUrl}/api/auth/verify-otp`,
                {
                    email,
                    otp
                },
                {
                    withCredentials: true
                }
            );

            setErr("");

            setStep(3);

        } catch (err) {

            setErr(err?.response?.data?.message);

        } finally {

            setIsLoading2(false);

        }
    };

    const handleResetPassword = async () => {

        if (newPassword !== confirmPassword) {

            setErr("Passwords do not match");

            return;
        }

        try {

            setIsLoading3(true);

            await axios.post(
                `${serverUrl}/api/auth/reset-password`,
                {
                    email,
                    newPassword,
                    confirmPassword
                },
                {
                    withCredentials: true
                }
            );

            setEmail("");

            setOtp("");

            setNewPassword("");

            setConfirmPassword("");

            setErr("");

            navigate("/signin");

        } catch (err) {

            setErr(err?.response?.data?.message);

        } finally {

            setIsLoading3(false);

        }
    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                <div className="flex items-center gap-4 mb-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-indigo-600 hover:text-indigo-700"
                    >
                        <FaArrowLeftLong size={20} />
                    </button>

                    <div>

                        <h1 className="text-2xl font-bold text-indigo-600">
                            Forgot Password
                        </h1>

                        <p className="text-gray-500 text-sm mt-1">
                            Reset your password securely
                        </p>

                    </div>

                </div>

                {
                    step === 1 && (

                        <div>

                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                            </div>

                            {
                                err && (
                                    <p className="text-red-500 text-sm text-center mb-3">
                                        {err}
                                    </p>
                                )
                            }

                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isLoading1}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                            >

                                {
                                    isLoading1 &&
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                }

                                {
                                    !isLoading1
                                        ? "Send OTP"
                                        : "Sending OTP..."
                                }

                            </button>

                        </div>
                    )
                }

                {
                    step === 2 && (

                        <div>

                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter 6 digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                            </div>

                            {
                                err && (
                                    <p className="text-red-500 text-sm text-center mb-3">
                                        {err}
                                    </p>
                                )
                            }

                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isLoading2}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                            >

                                {
                                    isLoading2 &&
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                }

                                {
                                    !isLoading2
                                        ? "Verify OTP"
                                        : "Verifying..."
                                }

                            </button>

                        </div>
                    )
                }

                {
                    step === 3 && (

                        <div>

                            <div className="mb-4">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-500"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {
                                            showNewPassword
                                                ? <IoEyeOff />
                                                : <IoEye />
                                        }
                                    </button>

                                </div>

                            </div>

                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {
                                            showConfirmPassword
                                                ? <IoEyeOff />
                                                : <IoEye />
                                        }
                                    </button>

                                </div>

                            </div>

                            {
                                err && (
                                    <p className="text-red-500 text-sm text-center mb-3">
                                        {err}
                                    </p>
                                )
                            }

                            <button
                                type="button"
                                onClick={handleResetPassword}
                                disabled={isLoading3}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                            >

                                {
                                    isLoading3 &&
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                }

                                {
                                    !isLoading3
                                        ? "Reset Password"
                                        : "Resetting..."
                                }

                            </button>

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default ForgetPassword;