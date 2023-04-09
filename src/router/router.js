import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export default router;