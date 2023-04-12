import React, {useEffect, useRef, useState} from 'react';
import styles from './LoginCard.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/store";
import UsersApi from "../../api/usersApi";
import {useIsUserLogin} from "../../hooks/useIsUserLogin";
import {useNavigate} from "react-router-dom";
import {homePage} from "../../router/router";


const LoginCard = () => {
    const [isRegForm, setIsRegForm] = useState(false);
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

    if(isUserLogin){
        navigate(homePage)
    }
    const changeParams = (key, param) => {
        console.log(param)
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
        UsersApi.loginUser(body)
            .then(data => {
                if (data._id) {
                    dispatch({type: setUser, user: data})
                    navigate(homePage)
                }
                setErrorMessage('* ' + data.message)
            })
    }

    const signUpUser = () => {
        console.log(loginParams)
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
            UsersApi.createUser(body)
                .then(data => {
                    console.log(!!data.user)
                    if (data.user) {
                        setTimeout(() => {
                            setErrorMessage('')
                            setIsRegForm(false)
                        }, 1000)
                    }
                    setErrorMessage('* ' + data.message)
                })


        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setErrorMessage('')
    }, [isRegForm])


    return (
        <div className={styles.card}>
            <div className={`${styles.errorMessage} ${isRegForm ? styles.errorMessage__right : ''}`}>
                {errorMessage}
            </div>

            {isRegForm
                ?
                <div
                    className={styles.signUp}
                >
                    <div className={styles.signUn__toSignIn}>
                        <h2>
                            {`Вже маєте Аккаунт`}
                        </h2>
                        <h3>
                            {`Якщо у вас наявний акаут \n ви можете перейти 
                            по кнопці нище, для входу`}
                        </h3>
                        <button onClick={() => setIsRegForm(false)}>
                            {`Увійти`}
                        </button>
                    </div>
                    <div className={styles.signUp__form}>
                        <h2>
                            {`Зареєструвати Аккаунт`}
                        </h2>
                        <input
                            type={"text"}
                            placeholder={'Name'}
                            onChange={(event) => changeParams("name", event.target.value)}/>
                        <input
                            type={"text"}
                            placeholder={'Second Name'}
                            onChange={(event) => changeParams("secondName", event.target.value)}/>
                        <input
                            type={"email"}
                            placeholder={"Email"}
                            onChange={(event) => changeParams("email", event.target.value)}/>
                        <input type={"password"}
                               placeholder={"Password"}
                               onChange={(event) => changeParams("password", event.target.value)}/>
                        <button onClick={signUpUser}>
                            {`Зареєструвати`}
                        </button>
                    </div>
                </div>
                :
                <div
                    className={styles.signIn}
                >
                    <div className={styles.signIn__form}>
                        <h2>
                            {`Увійти до Аккаунту`}
                        </h2>
                        <input type={"email"} placeholder={"Email"}
                               onChange={(event) => changeParams("email", event.target.value)}/>
                        <input type={"password"} placeholder={"Password"}
                               onChange={(event) => changeParams("password", event.target.value)}/>
                        <button onClick={logInUser}>
                            {`Увійти`}
                        </button>
                    </div>
                    <div className={styles.signIn__toSignUp}>
                        <h2>
                            {`Немає Аккаунту`}
                        </h2>
                        <h3>
                            {`Якщо у вас немає акауту \n ви можете перейти 
                            по кнопці нище, для його створення`}
                        </h3>
                        <button onClick={() => setIsRegForm(true)}>
                            {`Реєстрація`}
                        </button>
                    </div>
                </div>
            }
        </div>

    );
};

export default LoginCard;