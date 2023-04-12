import React from 'react';
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../static/save-life-logo.png'
import Switch from "../../UI/Switch/Switch";
import {useDispatch, useSelector} from 'react-redux'
import {setTheme} from "../../store/store";
import {homePage, firstAidPage, messagesPage, loginPage, userInfoPage, helpPhonesPage} from '../../router/router'

const Header = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)
    const user = useSelector(state => state.user)
    const changeTheme = (event) => {
        if (event.target.checked) {
            dispatch({type: setTheme, theme: 'dark'})
        } else {
            dispatch({type: setTheme, theme: 'light'})
        }
    }

    const isActiveLink = (isActive) => {
        return isActive ? styles.activeLink + ' ' : ''
    }
    return (
        <div className={theme === "light" ? styles.header_component : styles.header_component_dark}>
            <header className={styles.header}>
                <div >
                    <NavLink to={homePage} className={({isActive}) => isActiveLink(isActive) + styles.logo}>
                        <img src={logo} className={styles.logo_img} alt={'logo'}/>
                        <h2 className={styles.logo_name}>{`Save Life UA`}</h2>
                    </NavLink>
                </div>

                <div className={styles.navBar}>
                    <div className={styles.navBar_switch}>
                        <Switch checked={theme !== 'light'} switchToggle={changeTheme}/>
                    </div>
                    <NavLink to={homePage} className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}>
                        Головна
                    </NavLink>
                    <NavLink to={firstAidPage} className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}>
                        Перша Допомога
                    </NavLink>
                    <NavLink to={helpPhonesPage} className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}>
                        Екстренні номери
                    </NavLink>
                    {user
                        ?
                        <div>
                            <NavLink to={messagesPage} className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}>
                                Повідомити про небезпеку
                            </NavLink>
                            <NavLink to={userInfoPage} className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}>
                                Кабінет
                            </NavLink>
                        </div>
                        :
                        <div>
                            <NavLink
                                to={loginPage}
                                className={({isActive}) => isActiveLink(isActive) + styles.navBar_item}
                            >
                                Увійти
                            </NavLink>
                        </div>
                    }
                </div>
            </header>
        </div>
    );
};

export default Header;