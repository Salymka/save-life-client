import React, {useEffect, useState} from 'react';
import styles from './LoginCard.module.scss'
import {useDispatch} from "react-redux";
import UsersApi from "../../api/usersApi";
import {useIsUserLogin} from "../../hooks/useIsUserLogin";
import {useNavigate} from "react-router-dom";
import {homePage} from "../../router/router";
import Button from "../../UI/Button/Button";
import {useUserFromLS} from "../../hooks/useUserFromLS";
import Input from "../../UI/Input/Input";


const LoginCard = () => {
    const [isRegForm, setIsRegForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUserToLS] = useUserFromLS()
    const isUserLogin = useIsUserLogin()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [loginParams, setLoginParams] = useState({
        'name': null,
        'secondName': null,
        'email': null,
        'password': null
    })
    const dispatch = useDispatch()

    const changeParams = (key, param) => {
        setLoginParams({...loginParams, [key]: param})
        setErrorMessage('')
    }
    const logInUser = () => {
        if (!loginParams.email || !loginParams.password) {
            return setErrorMessage('* Заповніть всі поля')
        }
        const body = JSON.stringify({
            'email': loginParams.email,
            "password": loginParams.password
        })

        setIsLoading(true)
        try {
            UsersApi.loginUser(body)
                .then(data => {
                    if (data._id) {
                        setUserToLS(data)
                        navigate(homePage)
                    }
                    setErrorMessage('* ' + data.message)
                })
                .finally(() => setIsLoading(false))
        } catch (e) {
            console.log(e)
        }
    }

    const signUpUser = () => {
        if (!loginParams.email
            || !loginParams.password
            || !loginParams.name
            || !loginParams.secondName) {
            return setErrorMessage('* Заповніть всі поля')
        }
        const body = JSON.stringify({
            'name': loginParams.name,
            'secondName': loginParams.secondName,
            'email': loginParams.email,
            "password": loginParams.password
        })
        try {
            setIsLoading(true)
            UsersApi.createUser(body)
                .then(data => {
                    console.log(data.user)
                    if (data.user) {
                        setTimeout(() => {
                            setUserToLS(data.user)
                            navigate(homePage)
                        }, 1000)
                    }
                    setErrorMessage('* ' + data.message)
                })


        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isUserLogin) {
            navigate(homePage)
        }
        setErrorMessage('')
    }, [isRegForm])


    return (
        <div className={styles.card}>
            <div className={`${styles.errorMessage} ${isRegForm ? styles.errorMessage__right : ''}`}>
                {errorMessage}
            </div>
            <div
                className={`${styles.signUp} ${!isRegForm ? styles.hidden : ''}`}
            >
                <div className={styles.signUn__toSignIn}>
                    <h2>
                        {`Вже маєте Аккаунт`}
                    </h2>
                    <h3>
                        {`Якщо у вас наявний акаут \n ви можете перейти 
                            по кнопці нище, для входу`}
                    </h3>
                    <Button
                        onClick={() => setIsRegForm(false)}
                        isDisable={isLoading}>
                        {`Увійти`}
                    </Button>
                </div>
                <div className={styles.signUp__form}>
                    <h2>
                        {`Зареєструвати Аккаунт`}
                    </h2>
                    <Input
                        type={"text"}
                        placeholder={'Name'}
                        onChange={(event) => changeParams("name", event.target.value)}
                        value={loginParams.name}/>
                    <Input
                        type={"text"}
                        placeholder={'Second Name'}
                        onChange={(event) => changeParams("secondName", event.target.value)}
                        value={loginParams.secondName}/>
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        onChange={(event) => changeParams("email", event.target.value)}
                        value={loginParams.email}/>
                    <Input
                        type={"password"}
                        placeholder={"Password"}
                        onChange={(event) => changeParams("password", event.target.value)}
                        value={loginParams.password}/>
                    <Button
                        onClick={signUpUser}
                        isDisable={isLoading}>
                        {`Зареєструвати`}
                    </Button>

                </div>
            </div>

            <div
                className={`${styles.signIn} ${isRegForm ? styles.hidden : ''}`}
            >
                <div className={styles.signIn__form}>
                    <h2>
                        {`Увійти до Аккаунту`}
                    </h2>
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        onChange={(event) => changeParams("email", event.target.value)}
                        value={loginParams.email}/>
                    <Input
                        type={"password"}
                        placeholder={"Password"}
                        onChange={(event) => changeParams("password", event.target.value)}
                        value={loginParams.password}/>

                    <Button
                        onClick={logInUser}
                        isDisable={isLoading}>
                        {`Увійти`}
                    </Button>
                </div>
                <div className={styles.signIn__toSignUp}>
                    <h2>
                        {`Немає Аккаунту`}
                    </h2>
                    <h3>
                        {`Якщо у вас немає акауту \n ви можете перейти 
                            по кнопці нище, для його створення`}
                    </h3>
                    <Button
                        onClick={() => setIsRegForm(true)}
                        isDisable={isLoading}>
                        {`Реєстрація`}
                    </Button>

                </div>
            </div>
        </div>

    );
};

export default LoginCard;