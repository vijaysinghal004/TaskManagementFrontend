import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../redux/userSlice";
import { serverUrl } from "../App";

function useGetProject() {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const result = await axios.get(
                    `${serverUrl}/api/project/get-projects`,
                    {
                        withCredentials: true
                    }
                );

                dispatch(setProjects(result.data.projects));

            } catch (err) {
                console.log("Error fetching projects:", err);
            }

        };

        fetchProjects();

    }, [dispatch]);

}

export default useGetProject;