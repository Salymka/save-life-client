import React from 'react';
import styles from './Button.module.scss'
const Button = ({isDisable, children, onClick}) => {
    return (
        <button disabled={isDisable} onClick={onClick} className={styles.customButton}>
            {children}
        </button>
    );
};

export default Button;