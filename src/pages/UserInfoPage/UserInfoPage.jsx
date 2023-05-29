import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './UserInfoPage.module.scss'
import {useUserFromLS} from "../../hooks/useUserFromLS";
import {useNavigate} from "react-router-dom";
import {homePage} from "../../router/router";
import {useSelector} from "react-redux";
import userIcon from '../../static/userIcon.png'
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import usersApi from "../../api/usersApi";
import {useSetUserToStateAndLS} from "../../hooks/useSetUserToStateAndLS";

const UserInfoPage = () => {
    const user = useSelector(state => state.user)
    const [isChange, setIsChange] = useState(false)
    const navigate = useNavigate();
    const {setNewUserData} = useSetUserToStateAndLS();
    const [userInfo, setUserInfo] = useState({
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        location: user?.location ?? ''
    })

    function changeUserInfo(event, property) {
        setUserInfo({...userInfo, [property]: event.target.value})
        if (!isChange) return setIsChange(true)
    }

    async function updateUserInfo() {
        if(!isChange) return;
        const update = await usersApi.updateUserInfo(JSON.stringify(userInfo), user._id);
        console.log(update)
        if(update.message !== 'user update'){
            console.log('Error')
            setUserInfo({
                email: user.email,
                phone: user.phone ?? '',
                location: user.location ?? ''
            })
        }
        setNewUserData({...user, ...userInfo});
        setIsChange(false);
    }


    useEffect(() => {
        if (!user?._id) {
            navigate(homePage)
        }
    }, [])

    return (
        <div>
            <Header/>
            {user?._id &&
                <main className={styles.container}>
                <div className={styles.infoWrapper}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <img src={userIcon} alt={'default User Logo'} style={{width: 180}}/>
                        <h1 style={{fontSize: 42}}>
                            {`${user.name} ${user.secondName}`}
                        </h1>
                    </div>

                    <Input
                        type={'text'}
                        value={userInfo.email}
                        placeholder={"Set yours Email"}
                        onChange={(e) => changeUserInfo(e, 'email')}/>

                    <Input
                        type={'text'}
                        value={userInfo.phone}
                        placeholder={"Set yours Phone"}
                        onChange={(e) => changeUserInfo(e, 'phone')}/>

                    <Input
                        type={'text'}
                        value={userInfo.location}
                        placeholder={"Set yours home location"}
                        onChange={(e) => changeUserInfo(e, 'location')}/>

                    <Button isDisable={!isChange} onClick={updateUserInfo}>
                        {'Обновити інформацію'}
                    </Button>
                </div>

            </main>}
        </div>
    );
};

export default UserInfoPage;