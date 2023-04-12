import {useSelector} from "react-redux";


export const useIsUserLogin = () => {
    const user = useSelector(state => state.user)
    return !!user?._id
}