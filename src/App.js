import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {useSelector} from "react-redux";
import {useUserFromLS} from "./hooks/useUserFromLS";

export const lightTheme = 'light__theme';
export const darkTheme = 'dark__theme';

function App() {
    const theme = useSelector(state => state.theme)
    useUserFromLS()
    return (
        <div>
            <div className={`${theme} App`}>
                <RouterProvider router={router}/>
            </div>
        </div>

    );
}

export default App;
