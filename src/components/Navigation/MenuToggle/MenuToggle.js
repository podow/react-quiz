import React from 'react'
import styles from './MenuToggle.module.scss'

const MenuToggle = props => {
    const classes = [
        styles.MenuToggle,
        'fa'
    ];

    if (props.isOpen) {
        classes.push('fa-times')
        classes.push(styles.open)
    } else {
        classes.push('fa-bars')
    }

    return (
        <i
            className={classes.join(' ')}
            onClick={props.onToggle}
        >

        </i>
    )
};

export default MenuToggle