import React from 'react'
import styles from './AnswersList.module.scss'

import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={styles.AnswersList}>
        { props.answers.map(answer => (
            <AnswerItem
                key={answer.id}
                answer={answer}
                state={props.state ? props.state[answer.id] : null}
                onAnswerClick={props.onAnswerClick}
            />
        )) }
    </ul>
);

export default AnswersList