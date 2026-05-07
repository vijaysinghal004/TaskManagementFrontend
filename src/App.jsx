import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword'
import Home from './pages/Home'
import CreateProject from './pages/CreateProject'
import ProjectDetails from './pages/ProjectDetails'
import CreateTask from './pages/CreateTask'
import MyTasks from './pages/MyTasks'

import useGetCurrentUser from './hooks/UseGetCurrentUser'
import useGetMembers from './hooks/UseGetMembers'
import useGetProject from './hooks/UseGetProject'
import EditProject from './pages/EditProject'

export const serverUrl = 'http://localhost:8080';

const App = () => {

    useGetCurrentUser();
    useGetMembers();
    useGetProject();

    const { userData } = useSelector(state => state.user);

    return (

        <Routes>

            <Route
                path='/signup'
                element={!userData ? <SignUp /> : <Navigate to="/" />}
            />

            <Route
                path='/signin'
                element={!userData ? <Signin /> : <Navigate to="/" />}
            />

            <Route
                path='/forget-password'
                element={!userData ? <ForgetPassword /> : <Navigate to="/" />}
            />

            <Route
                path='/'
                element={userData ? <Home /> : <Navigate to="/signin" />}
            />

            <Route
                path='/create-project'
                element={
                    userData && userData.role === "admin"
                        ? <CreateProject />
                        : <Navigate to="/" />
                }
            />
   <Route
                path='/edit-project/:id'
                element={
                    userData && userData.role === "admin"
                        ? <EditProject />
                        : <Navigate to="/" />
                }
            />
            <Route
                path='/project/:id'
                element={
                    userData
                        ? <ProjectDetails />
                        : <Navigate to="/signin" />
                }
            />

            <Route
                path='/create-task/:projectId'
                element={
                    userData && userData.role === "admin"
                        ? <CreateTask />
                        : <Navigate to="/" />
                }
            />

            <Route
                path='/my-tasks'
                element={
                    userData && userData.role === "member"
                        ? <MyTasks />
                        : <Navigate to="/" />
                }
            />

        </Routes>
    )
}

export default App