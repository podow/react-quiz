import React, {Component} from 'react'
import styles from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { createControl, validate, validateForm } from '../../form/FormFramework'
import Select from "../../components/UI/Select/Select";

import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

class QuizCreator extends Component {
    createOptionControl = number => {
        return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        }, {
            required: true
        })
    };

    createFormControls() {
        return {
            question: createControl({
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым'
            }, {
                required: true
            }),
            option1: this.createOptionControl(1),
            option2: this.createOptionControl(2),
            option3: this.createOptionControl(3),
            option4: this.createOptionControl(4),
        }
    }

    state = {
        formControls: this.createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    };

    submitHandler = event => {
        event.preventDefault()
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const {
            question,
            option1,
            option2,
            option3,
            option4
        } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            formControls: this.createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    };

    createQuizHandler = async event => {
        event.preventDefault();

        this.setState({
            quiz: [],
            formControls: this.createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        });

        this.props.finishCreateQuiz();
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shoulValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {
                        index === 0 ? <hr/> : null
                    }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {
        return (
            <div className={styles.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        { this.renderControls() }

                        <Select
                            label='Выберете првильный ответ'
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                { text: 1, value: 1 },
                                { text: 2, value: 2 },
                                { text: 3, value: 3 },
                                { text: 4, value: 4 },
                            ]}
                        />

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function masDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, masDispatchToProps)(QuizCreator);