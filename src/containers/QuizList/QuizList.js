import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'

import styles from './QuizList.module.scss'

import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {
    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        {
                            this.props.loading
                                ? <Loader />
                                : this.renderQuizes()
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);