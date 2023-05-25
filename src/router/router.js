import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MessagesPage from "../pages/MessagesPage/MessagesPage";
import FirstAidPage from "../pages/FirstAidPage/FirstAidPage";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage";
import HelpPhonesPage from "../pages/HelpPhonesPage/HelpPhonesPage";
import OperatorsPage from "../pages/OperatorsPage/OperatorsPage";

export const homePage = '/';
export const loginPage = '/login';
export const firstAidPage = '/first-aid';
export const helpPhonesPage = '/help-phones';
export const messagesPage = '/send-alert-message';
export const userInfoPage = '/user-info';
export const operators = '/operators';

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
        element: <FirstAidPage/>,
    },
    {
        path: helpPhonesPage,
        element: <HelpPhonesPage/>,
    },
    {
        path: messagesPage,
        element: <MessagesPage/>,
    },
    {
        path: userInfoPage,
        element: <UserInfoPage/>,
    },
    {
        path: operators,
        element: <OperatorsPage/>,
    },

]);

export default router;