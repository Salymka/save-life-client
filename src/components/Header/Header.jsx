import React from 'react';
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../static/save-life-logo.png'
import Switch from "../../UI/Switch/Switch";
import {useDispatch, useSelector} from 'react-redux'
import {setTheme} from "../../store/store";

const Header = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)
    const login = false;
    const changeTheme = (event) => {
        if (event.target.checked) {
            dispatch({type: setTheme, theme: 'dark'})
        } else {
            dispatch({type: setTheme, theme: 'light'})
        }
    }
    return (
        <div className={theme === "light" ? styles.header_component : styles.header_component_dark}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <NavLink to={'/'}>
                        <img src={logo} className={styles.logo_img} alt={'logo'}/>
                    </NavLink>
                </div>

                <div className={styles.navBar}>
                    <div className={styles.navBar_switch}>
                        <Switch switchToggle={changeTheme}/>
                    </div>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Новини
                    </NavLink>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Перша Допомога
                    </NavLink>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Екстренні номери
                    </NavLink>
                    {login
                        ?
                        <div>
                            <NavLink to={'/'} className={styles.navBar_item}>
                                Повідомити про небезпеку
                            </NavLink>
                            <NavLink to={'/'} className={styles.navBar_item}>
                                Кабінет
                            </NavLink>
                        </div>
                        :
                        <div>
                            <NavLink
                                to={'/login'}
                                className={styles.navBar_item}
                                style={({isActive}) => isActive && {color: "red"}}
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