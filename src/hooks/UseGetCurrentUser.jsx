import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from '../App'



function useGetCurrentUser() {
    const dispatch=useDispatch();
    useEffect(() => { 
        const fetchuser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
                console.log(result);
                dispatch(setUserData(result.data.user))
            } catch (err) {
                console.log(err);
            }
        }
        fetchuser();
    }, [])
}

export default useGetCurrentUser