import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {useSelector} from "react-redux";

export const lightTheme = 'light__theme';
export const darkTheme = 'dark__theme';
function App() {
    const theme = useSelector(state => state.theme)
    return (
        <div>
            <div className={`App ${theme}`}>
                <RouterProvider router={router}/>
            </div>
        </div>

    );
}

export default App;
