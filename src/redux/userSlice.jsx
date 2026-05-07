import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name: "user",

    initialState: {

        userData: null,

        projects: [],

        tasks: [],

        members: []

    },

    reducers: {

        setUserData: (state, action) => {

            state.userData = action.payload;

        },

        setProjects: (state, action) => {

            state.projects = action.payload;

        },

        setTasks: (state, action) => {

            state.tasks = action.payload;

        },

        setMembers: (state, action) => {

            state.members = action.payload;

        }

    }

});

export const {
    setUserData,
    setProjects,
    setTasks,
    setMembers
} = userSlice.actions;

export default userSlice.reducer;