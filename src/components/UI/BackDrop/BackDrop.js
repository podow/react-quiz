import React from 'react'

import styles from './BackDrop.module.scss'

const BackDrop = props => <div className={styles.BackDrop} onClick={props.onClick} />;

export default BackDrop