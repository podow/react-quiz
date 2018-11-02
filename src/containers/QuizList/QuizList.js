import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'

import styles from './QuizList.module.scss'

import axios from 'axios'

class QuizList extends Component {
    state = {
        quizes: [],
        loading: true
    };

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-62726.firebaseio.com/quizes.json');

            const quizes = [];
            
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            });

            this.setState({
                quizes,
                loading: false
            })
        } catch (e) {
            console.warn(e);
        }
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        { this.state.loading ? <Loader /> : this.renderQuizes()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default QuizList;