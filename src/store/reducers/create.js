import {CREATE_QUIZ_ACTION, RESERT_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: []
};

export function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_ACTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            };
        case RESERT_QUIZ_CREATION:
            return {
                ...state,
                quiz: []
            };
        default:
            return state
    }
}