import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import styles from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";

const links = [
    {
        to: '/',
        label: 'Список тестов',
        exact: true
    },
    {
        to: '/auth',
        label: 'Авторизация',
        exact: false
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false
    }
];

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={styles.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const classes = [
            styles.Drawer
        ];

        if (!this.props.isOpen) {
            classes.push(styles.close)
        }

        return (
            <>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {
                    this.props.isOpen
                        ? <BackDrop onClick={this.props.onClose} />
                        : null
                }
            </>
        )
    }
}

export default Drawer