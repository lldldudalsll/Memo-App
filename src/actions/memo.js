import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';

import axios from 'axios';
import { error } from 'util';

// MEMO POST
export function memoPostRequest(contents) {
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(memoPost());

        return axios.post('/api/memo', { contents })
        .then((response) => {
            dispatch(memoPostsSuccess());
        })
        .catch((error) => {
            dispatch(memoPostFailure(error.response.data.code));
        })
    };
}

export function memoPost() {
    return {
        types: MEMO_POST
    };
}

export function memoPostsSuccess() {
    return {
        types: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}