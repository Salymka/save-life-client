import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../store/store";


const localStorageUser = `Save-Life-User`

export const useUserFromLS = () => {
    const dispatch = useDispatch()
    const [user, setLocalUser] = useState(() => {
        if (typeof window === "undefined") {
            return {};
        }
        try {
            const item = window.localStorage.getItem(localStorageUser);
            return item ? JSON.parse(item) : {};
        } catch (error) {
            console.log(error);
            return {};
        }
    });
    if(user?._id) {
        dispatch({type:setUser, user: user})
    }

    const setUserToLS = (user) => {
        setLocalUser(user);
        dispatch({type:setUser, user: user})

        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(localStorageUser, JSON.stringify(user));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return [user, setUserToLS]
}