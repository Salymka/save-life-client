import React from 'react';
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../static/save-life-logo.png'
const Header = () => {
    return (
        <div className={styles.header_component}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <NavLink to={'/'}>
                        <img src={logo} className={styles.logo_img}/>
                    </NavLink>
                </div>
                <div className={styles.navBar}>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Test
                    </NavLink>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Add
                    </NavLink>
                    <NavLink to={'/'} className={styles.navBar_item}>
                        Remote
                    </NavLink>
                </div>
            </header>
        </div>
    );
};

export default Header;