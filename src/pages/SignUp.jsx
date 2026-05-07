import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.jsx';
import { serverUrl } from '../App.jsx';

const SignUp = () => {

    const primaryColor = '#2563EB';
    const hoverColor = '#1E40AF';
    const bgColor = '#EFF6FF';
    const borderColor = '#E5E7EB';

    const [showPassword, setshowPassword] = useState(false);
    const [role, setRole] = useState('member');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [err, setErr] = useState("");

    const dispatch = useDispatch();

    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            const result = await axios.post(
                `${serverUrl}/api/auth/signUp`,
                {
                    fullName,
                    email,
                    mobileno,
                    password,
                    role
                },
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(result.data.user));

            setErr("");

            navigate("/signin");

        } catch (err) {

            setErr(err?.response?.data?.message);

        }
    }

    const handleGoogleAuth = async () => {

        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        try {

            const { data } = await axios.post(
                `${serverUrl}/api/auth/google-auth`,
                {
                    fullName: result.user.displayName,
                    email: result.user.email,
                    role,
                    password,
                    mobileno
                },
                {
                    withCredentials: true
                }
            );

            dispatch(setUserData(data.user));

            navigate("/");

        } catch (err) {

            setErr(err?.response?.data?.message);

        }
    }

    return (

        <div
            className='min-h-screen flex items-center justify-center p-8'
            style={{ backgroundColor: bgColor }}
        >

            <div
                className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6'
                style={{ border: `1px solid ${borderColor}` }}
            >

                <h1
                    className='text-2xl font-bold mb-1'
                    style={{ color: primaryColor }}
                >
                    TaskFlow
                </h1>

                <p className='text-gray-600 mb-4'>
                    Create your account to manage projects and tasks
                </p>

                <form onSubmit={handleSignup}>

                    <div className='mb-3'>

                        <label className='block text-gray-700 font-medium mb-1'>
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='Enter your Full Name'
                            className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                            style={{ border: `1px solid ${borderColor}` }}
                        />

                    </div>

                    <div className='mb-3'>

                        <label className='block text-gray-700 font-medium mb-1'>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                            style={{ border: `1px solid ${borderColor}` }}
                        />

                    </div>

                    <div className='mb-3'>

                        <label className='block text-gray-700 font-medium mb-1'>
                            Mobile No
                        </label>

                        <input
                            type="text"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                            placeholder='Enter your Mobile No'
                            className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                            style={{ border: `1px solid ${borderColor}` }}
                        />

                    </div>

                    <div className='mb-3'>

                        <label className='block text-gray-700 font-medium mb-1'>
                            Password
                        </label>

                        <div className='relative'>

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                                className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                                style={{ border: `1px solid ${borderColor}` }}
                            />

                            <button
                                type="button"
                                className='absolute right-3 top-3 text-gray-500'
                                onClick={() => setshowPassword(prev => !prev)}
                            >
                                {showPassword ? <IoMdEyeOff /> : <IoEye />}
                            </button>

                        </div>

                    </div>

                    <div className='mb-3'>

                        <label className='block text-gray-700 font-medium mb-1'>
                            Role
                        </label>

                        <div className='flex gap-2'>

                            {['member', 'admin'].map((r) => (

                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className='flex-1 rounded-lg px-3 py-2 font-medium transition'
                                    style={
                                        role === r
                                            ? {
                                                backgroundColor: primaryColor,
                                                color: "white"
                                            }
                                            : {
                                                border: `1px solid ${primaryColor}`,
                                                color: primaryColor
                                            }
                                    }
                                >
                                    {r}
                                </button>

                            ))}

                        </div>

                    </div>

                    <button
                        type='submit'
                        className='w-full mt-4 px-4 py-2 rounded-lg text-white transition duration-200'
                        style={{ backgroundColor: primaryColor }}
                        onMouseOver={(e) => e.target.style.backgroundColor = hoverColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
                    >
                        Sign Up
                    </button>

                    {
                        err && (
                            <p className='text-red-500 text-center mt-2'>
                                {err}
                            </p>
                        )
                    }

                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        className='w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 border rounded-lg hover:bg-gray-100 transition'
                    >
                        <FcGoogle size={20} />
                        <span>Sign up with Google</span>
                    </button>

                </form>

                <p
                    className='text-center mt-3 cursor-pointer'
                    onClick={() => navigate("/signin")}
                >
                    Already Have an Account ?{" "}

                    <span className='text-blue-600 font-semibold'>
                        Sign in
                    </span>

                </p>

            </div>

        </div>
    )
}

export default SignUp;