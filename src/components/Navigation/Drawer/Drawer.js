import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import styles from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";

class Drawer extends Component {
    renderLinks(links) {
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

        const links = [
            { to: '/', label: 'Список тестов', exact: true }
        ];

        if (this.props.isAuth) {
            links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false });
            links.push({ to: '/logout', label: 'Выйти', exact: false });
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: false })
        }

        return (
            <>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
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