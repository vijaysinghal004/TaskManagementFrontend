import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMembers } from "../redux/userSlice";
import { serverUrl } from '../App'


function useGetMembers() {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchMembers = async () => {

            try {

                const result = await axios.get(
                    `${serverUrl}/api/user/members`,
                    {
                        withCredentials: true
                    }
                );

                dispatch(setMembers(result.data.members));

            } catch (err) {

                console.log(err);

            }
        };

        fetchMembers();

    }, []);

}

export default useGetMembers;