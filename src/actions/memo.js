import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';

// import thunk from 'redux-thunk';
import axios from 'axios';

// MEMO POST
// 함수와 객체를 반환하는 함수를 만들어 준다!
export function memoPostRequest(contents) {
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(memoPost());

        return axios.post('/api/memo', { contents })
        .then((response) => {
            dispatch(memoPostSuccess());
        }).catch((error) => {
            dispatch(memoPostFailure(error.response.data.code));
        });
    };
}

export function memoPost() {
    return {
        type: MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}