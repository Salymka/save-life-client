import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";

export const homePage = '/';
export const loginPage = '/login';
export const firstAidPage = '/first-aid';
export const helpPhonesPage = 'help-phones';
export const messagesPage = '/send-alert-message';
export const userInfoPage = '/user-info';

const router = createBrowserRouter([
    {
        path: homePage,
        element: <HomePage />,
    },
    {
        path: loginPage,
        element: <LoginPage />,
    },
    {
        path: firstAidPage,
        element: <div>{firstAidPage}</div>,
    },
    {
        path: helpPhonesPage,
        element: <div>{helpPhonesPage}</div>,
    },
    {
        path: messagesPage,
        element: <div>{messagesPage}</div>,
    },
    {
        path: userInfoPage,
        element: <div>{userInfoPage}</div>,
    },

]);

export default router;