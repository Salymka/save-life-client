import React from 'react';
import Header from "../../components/Header/Header";
import LoginCard from "../../components/LoginCard/LoginCard";
import styles from './LoginPage.module.scss'
const LoginPage = () => {
    return (
        <div>
            <Header/>
            <div className={styles.loginCard_wrapper}>
                <LoginCard/>
            </div>
        </div>
    );
};

export default LoginPage;