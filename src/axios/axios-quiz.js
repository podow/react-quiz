import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-62726.firebaseio.com/'
})