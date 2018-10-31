import React, {Component} from 'react'
import styles from './Drawer.module.scss'
import BackDrop from "../../UI/BackDrop/BackDrop";

const links = [1, 2, 3];

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
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