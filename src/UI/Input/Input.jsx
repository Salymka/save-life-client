import React from 'react';
import styles from './Input.module.scss'

const Input = ({onChange, type, placeholder, value}) => {
    return (
        <input
            className={styles.customInput}
            type={type}
            placeholder={placeholder}
            onChange={(event) => onChange(event)}
            value={value ? value : ''}/>
    );
};

export default Input;