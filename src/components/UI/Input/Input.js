import React from 'react'

import styles from './Input.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const classes = [
        styles.Input
    ];
    const htmlFor = props.htmlFor || `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        classes.push(styles.invalid)
    }

    return (
        <div className={classes.join(' ')}>
            <label
                htmlFor={htmlFor}
            >
                {props.label}
                </label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            {isInvalid(props) && <span>{props.errorMessage || 'Введите верное значение'}</span>}
        </div>
    )
};

export default Input