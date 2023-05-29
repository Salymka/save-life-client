import {useDispatch} from "react-redux";
import {setUser} from "../store/store";


const localStorageUser = `Save-Life-User`

export const useSetUserToStateAndLS = () => {
    const dispatch = useDispatch()
    const setNewUserData = (user) => {
        dispatch({type:setUser, user: user})

        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(localStorageUser, JSON.stringify(user));
            }
        } catch (error) {
            console.log(error);
        }
    }


    return {setNewUserData};
}