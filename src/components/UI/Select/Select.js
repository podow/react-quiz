import React from 'react'
import styles from './Select.module.scss'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <div className={styles.Select}>
            <label
                htmlFor={htmlFor}
            >
                {props.label}
            </label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option, index) => {
                    return (
                        <option
                            key={option.value + index}
                            value={option.value}
                        >
                            {option.text}
                        </option>
                    )
                }) }
            </select>
        </div>
    )
};

export default Select