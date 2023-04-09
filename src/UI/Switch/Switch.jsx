import React from 'react';
import './Switch.module.scss'
const Switch = ({switchToggle}) => {
    return (
        <React.Fragment>
            <input
                type="checkbox"
                id={'switch'}
                onInput={(event) => switchToggle(event)}
            />
            <label htmlFor="switch">Toggle</label>
        </React.Fragment>
    );
};

export default Switch;